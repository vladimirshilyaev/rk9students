#include <stdio.h>
#include "common/PolyModel.h"
#include "MarchingCubes.h"
#include "fparser.h"
#include "UnitCell.h"

using namespace rk9;
using namespace std;


bool run(MarchingCubes &mc, float isoval, string function, 
	double xmin, double xmax, double ymin, double ymax, double zmin, double zmax, double pace){
					
	enum Axis { X = 0, Y = 1, Z = 2 };

			// Parse formula
			FunctionParser fparser;								   
	fparser.Parse (function, "x,y,z,c,i");

	if (fparser.EvalError()) {
		printf("parse error\n");
		return false;
	}
	
	float rx = (xmax - xmin) / (mc.size().x - 1);
	float ry = (ymax - ymin) / (mc.size().y - 1);
	float rz = (zmax - zmin) / (mc.size().z - 1);

	glm::vec3 min_pos(xmin, ymin, zmin);
	glm::vec3 range(rx, ry, rz);

	for (int i = 0; i < mc.size().x; i++) {
		float val[5];
		val[X] = (float)i * rx + xmin;
		for (int j = 0; j < mc.size().y; j++) {
			val[Y] = (float)j * ry + ymin;
			for (int k = 0; k < mc.size().z; k++) {
				val[Z] = (float)k * rz + zmin;

				auto w = fparser.Eval(val) - isoval;

				if (w > 0.0) {
					mc.set_data(w, glm::ivec3(i, j, k)); }
				if (w <= 0.0) {
					Schoen_Gyroid Cell;
					double build_cell = Cell.Eval(val[X],val[Y],val[Z]);
					mc.set_data(build_cell, glm::ivec3(i, j, k));
				}
			}
		}
	}

	// Run MC
	mc.SetAlgorithm(MarchingCubes::TopologicalMarchingCubes);
	mc.run();

	// Rescale positions
	for (int i = 0; i < mc.nverts(); ++i) {
		Vertex &v = mc.vertices()[i];
		v.pos = range * v.pos + min_pos;
		v.n = glm::normalize(v.n);
	}

	return true;
}

int main (int argc, char ** argv) {

	string function (argv[1]);

	double xmin = stod(argv[2]); 
	double xmax = stod(argv[3]); 
	double ymin = stod(argv[4]);
	double ymax = stod(argv[5]);
	double zmin = stod(argv[6]);
	double zmax = stod(argv[7]);

	double pace = stod(argv[8]);

	int cells_count = (int) ((xmax - xmin) / pace);
	
	MarchingCubes mc(glm::ivec3(100));
	mc.Setup();
	run(mc, 0, function, xmin, xmax, ymin, ymax, zmin, zmax, pace);

	auto verts = std::vector<glm::vec3>();
	verts.reserve(mc.ntrigs() * 3);

	rk9::PolyModel m;

	for (int i = 0; i < mc.ntrigs(); ++i) {
		auto tri = mc.trig(i);

		rk9::Point p[3];

		for (int t = 0; t < 3; ++t) {
			auto vertex = mc.vert(tri.ids[t]).pos;
			p[t].X = vertex.x;
			p[t].Y = vertex.y;
			p[t].Z = vertex.z;
		}

		m.AddTriangle(p[0], p[1], p[2]);
	}

	m.WriteToSTLFile("output.stl");

	return 0;
}
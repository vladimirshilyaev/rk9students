#include <stdio.h>
#include "common/PolyModel.h"
#include "MarchingCubes.h"
#include "UnitCell.h"
#include "Transform.h"
#include <string>

using namespace rk9;
using namespace std;


bool run(MarchingCubes &mc, double Length, double Width, double Height){
					
	enum Axis { X = 0, Y = 1, Z = 2 };
	
	float rx = (Length) / (mc.size().x - 1);
	float ry = (Width) / (mc.size().y - 1);
	float rz = (Height) / (mc.size().z - 1);

	glm::vec3 min_pos(0, 0, 0);
	glm::vec3 range(rx, ry, rz);

	for (int i = 0; i < mc.size().x; i++) {
		float val[3];
		val[X] = (float)i * rx;
		for (int j = 0; j < mc.size().y; j++) {
			val[Y] = (float)j * ry;
			for (int k = 0; k < mc.size().z; k++) {
				val[Z] = (float)k * rz;

				Schoen_Gyroid Cell;
				double build_cell = Cell.Eval(val[X], val[Y], val[Z]);
				mc.set_data(build_cell, glm::ivec3(i, j, k));
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



bool run_spheric(MarchingCubes &mc, double R, double Length, double Width, double Height) {

	const double PI = 3.141592653589793;

	enum Axis { X = 0, Y = 1, Z = 2 };

	float rx = (Length) / (mc.size().x - 1);
	float ry = (Height) / (mc.size().y - 1);
	float rz = (Width) / (mc.size().z - 1);

	glm::vec3 min_pos((-Length/2), (-Height / 2), 0);
	glm::vec3 range(rx, ry, rz);

	for (int i = 0; i < mc.size().x; i++) {
		float val[5];
		val[X] = (float)i * rx - (Length/2);
		for (int j = 0; j < mc.size().y; j++) {
			val[Y] = (float)j * ry - (Height / 2);
			for (int k = 0; k < mc.size().z; k++) {
				val[Z] = (float)k * rz;
				
				if (sqrt(pow(val[X], 2) + pow(val[Y], 2)) < ((PI/2)*R))
				{
					Schoen_Gyroid Cell;
					double build_cell = Cell.Eval(val[X], val[Y], val[Z]);
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
	
	/*�� ���� ����������� ��������� �� ��������� ������:
	-��� ������ (1-�������, 0 - �����)
	-������ ��������/�����
	-������� ����
	-������ ��������/�������� ���� �����
	-���� ������� ��������/������������ ���� ������� �����
	-����������� ����������� 1 - �������������, 0 - �������������
	*/
	
	/*������� ������� ������ ��������:
	1 10 5 30 360 0
	1 10 10 20 270 1
	*/
	
	/*������� ������� ������ �����:
	0 10 10 360 360 1
	0 10 5 180 270 0
	*/

	const double PI = 3.141592653589793;
	//��������� �������� �� �������� � �������
	double DegToRad = PI / 180;
	//��� ������ 
	double Type = stod(argv[1]);
	
	double R;
	double Width;
	double Height;
	double Length;
	double Phi0;
	double Theta0;

	//���� �������
	if (Type)
	{
		//������
		R = stod(argv[2]);
		//������� (������ ������������� ������� ��� "������������")
		Width = stod(argv[3]);
		//������ ��������
		Height = stod(argv[4]);
		Phi0 = stod(argv[5])*DegToRad;
		//����� ������� ��������
		Length = Phi0 * R;
	}
	else
	{
		//������
		R = stod(argv[2]);
		//������� (������ ������������� ������� ��� "������������")
		Width = stod(argv[3]);
		//�������� ���� ������� �����
		Theta0 = stod(argv[4]) * DegToRad;
		// ������������ ���� ������� �����
		Phi0 = stod(argv[5]) * DegToRad;
		// ����� ������� ����� �� ������(������ ������������� ������� ��� "������������")
		Height = (PI)*R;
		//Height = Theta0 * R;
		//������� ����� �� �������(����� ������������� ������� ��� "������������")
		Length = (PI)*R;
	}
	
		
	//����������� ����������� 1 - �������������, 0 - �������������
	double Dir;
	if (stod(argv[6]))
		Dir = 1;
	else
		Dir = -1;
	
	MarchingCubes mc(glm::ivec3(100));
	mc.Setup();
	
	//������ ���������� ������������� �������
	if (Type)
		run(mc, Length, Width, Height);
	else
		run_spheric(mc, R, Length, Width, Height);
	//std vector shrink to fit
	//resize
	//shrink_to_fit

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
			double z = p[t].Z;
	
			if(Type)
			{
				//������ ������������ ������������� ������� � ��������������
				Cylindric_Transformation Coords;
				p[t] = Coords.Transform(p[t], R, Dir, t);
			}
			else
			{ 
				//������ ������������ ������������� ������� � �����������
				Spheric_From_Polar_Transformation Coords;
				p[t] = Coords.Transform(p[t], R, Dir);
			}
			
		}

		m.AddTriangle(p[0], p[1], p[2]);
	}

	m.WriteToSTLFile("output.stl");

	return 0;
}
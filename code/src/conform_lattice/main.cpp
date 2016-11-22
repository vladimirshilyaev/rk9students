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
		float val[5];
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
	1 10 5 30 360 1
	1 10 5 30 270 0
	*/
	
	/*������� ������� ������ �����:
	0 10 5 360 360 1
	0 10 5 180 270 -1
	*/
	
	
	const double PI = 3.141592653589793;
	//��������� �������� �� �������� � �������
	double DegToRad = PI / 180;
	//��� ������ 
	double Type = stod(argv[1]);
	//������
	double R = stod(argv[2]);
	//������� (������ ������������� ������� ��� "������������")
	double Width = stod(argv[3]);
	//������ ��������/����� ������� ����� �� ������ (������ ������������� ������� ��� "������������")
	double Height;
	//�������� ���� ������� �����
	double Theta0;
	if (Type)
		Height = stod(argv[4]);
	else
	{
		Theta0 = stod(argv[4]) * DegToRad;
		Height = Theta0 * R;
	}	
	//���� ������� ��������/������������ ���� ������� �����
	double Phi0 = stod(argv[5]) * DegToRad;
	//����� ������� ��������/������� ����� �� �������(����� ������������� ������� ��� "������������")
	double Length = Phi0 * R;
	//����������� ����������� 1 - �������������, 0 - �������������
	double Dir;
	if (stod(argv[6]))
		Dir = 1;
	else
		Dir = -1;
	
	MarchingCubes mc(glm::ivec3(100));
	mc.Setup();
	
	//������ ���������� ������������� �������
	run(mc, Length, Width, Height);

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


			if(Type)
			{
				//������ ������������ ������������� ������� � ��������������
				Cylindric_Transformation Coords;
				p[t] = Coords.Transform(p[t], R, Dir);
			}
			else
			{ 
				//������ ������������ ������������� ������� � �����������
				Spheric_Transformation Coords;
				p[t] = Coords.Transform(p[t], R, Dir);
			}

		}

		m.AddTriangle(p[0], p[1], p[2]);
	}

	m.WriteToSTLFile("output.stl");

	return 0;
}
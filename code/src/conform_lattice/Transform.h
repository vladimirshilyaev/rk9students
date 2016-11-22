#pragma once
#include <math.h>
#include <cmath>

namespace rk9 {

	class Conform_Transformation {

	public:
		virtual Point Transform() {
			return {0,0,0};
		};
	};

	class Cylindric_Transformation : public Conform_Transformation {

	public:
		Point Transform(Point p, double R, double Length, double Phi0, double Dir) {
			//������� �� ���� ��
			double PhiScale = Phi0 / Length;
			
			//������������� ���������� ��������� � ���� ��������������� ��������������
			//������� ��������� � � ��
			double Phi = p.X * PhiScale;
			//������� ��������� Y � ��
			double Ro = R + (Dir * p.Y);
			//������� ��������� Z
			double Z1 = p.Z;

			//������� �� �������������� ��������� � ����������
			p.X = Ro * cos(Phi);
			p.Y = Ro * sin(Phi);
			p.Z = Z1;
			
			return p;
		}
	};
}
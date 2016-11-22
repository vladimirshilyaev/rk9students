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
		Point Transform(Point p, double R, double Dir) {
			
			//������������� ���������� ��������� � ���� ��������������� ��������������
			//������� ��������� � � ��
			double Phi = p.X/R;
			//������� ��������� Y � ��
			double Ro = R + (Dir * p.Y);
			//������� ��������� Z
			double Z = p.Z;

			//������� �� �������������� ��������� � ����������
			p.X = Ro * cos(Phi);
			p.Y = Ro * sin(Phi);
			p.Z = Z;
			
			return p;
		}
	};

	class Spheric_Transformation : public Conform_Transformation {

	public:
		Point Transform(Point p, double R, double Dir) {

			//������������� ���������� ��������� � ���� ��������������� �����������
			//������� ��������� � � ��
			double Phi = p.X / R;
			//������� ��������� Y � ��
			double Ro = R + (Dir * p.Y);
			//������� ��������� Z
			double Theta = p.Z / (2*R);

			//������� �� �������������� ��������� � ����������
			p.X = Ro * sin(Theta) * cos(Phi);
			p.Y = Ro * sin(Theta) * sin(Phi);
			p.Z = Ro * cos(Theta);

			return p;
		}
	};
}
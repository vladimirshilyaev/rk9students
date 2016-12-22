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
		Point Transform(Point p, double R, double Dir, int i) {
			
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

	class Spheric_From_Polar_Transformation : public Conform_Transformation {

	public:
		Point Transform(Point p, double R, double Dir) {

			const double PI = 3.141592653589793;
			//������� �� ���������� ��������� � ��������������
			double Phi = atan2(p.Y, p.X);
			//������� ��������� Y � ��
			double RoCyl = sqrt(pow(p.X, 2) + pow(p.Y, 2));
			//������� ��������� Z
			double z = p.Z;
			//������������ �������������� ������� �� ����� 
			//Phi ������� = Phi �����
			//������� ��������� �� � Theta
			double Theta = (RoCyl / R);
			//������� ��������� Z
			double Ro = R + (Dir * p.Z);
			//������� �� ����������� ��������� � ����������
			
			p.X = Ro * sin(Theta) * cos(Phi);
			p.Y = Ro * sin(Theta) * sin(Phi);
			p.Z = Ro * cos(Theta);
			
			return p;
		}
	};
}
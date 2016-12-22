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
			
			//представление декартовых координат в виде соответствующих цилиндрических
			//перевод координат ’ в ‘и
			double Phi = p.X/R;
			//перевод координат Y в –о
			double Ro = R + (Dir * p.Y);
			//перевод координат Z
			double Z = p.Z;

			//переход от цилиндрических координат в декартовые
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
			//переход от декартовых координат в цилиндрические
			double Phi = atan2(p.Y, p.X);
			//перевод координат Y в –о
			double RoCyl = sqrt(pow(p.X, 2) + pow(p.Y, 2));
			//перевод координат Z
			double z = p.Z;
			//–асположение цилиндрической решетки на сфере 
			//Phi решетки = Phi сферы
			//перевод координат –о в Theta
			double Theta = (RoCyl / R);
			//перевод координат Z
			double Ro = R + (Dir * p.Z);
			//переход от сферических координат в декартовые
			
			p.X = Ro * sin(Theta) * cos(Phi);
			p.Y = Ro * sin(Theta) * sin(Phi);
			p.Z = Ro * cos(Theta);
			
			return p;
		}
	};
}
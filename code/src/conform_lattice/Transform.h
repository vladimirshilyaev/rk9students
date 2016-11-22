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
			//масштаб по углу ‘и
			double PhiScale = Phi0 / Length;
			
			//представление декартовых координат в виде соответствующих цилиндрических
			//перевод координат ’ в ‘и
			double Phi = p.X * PhiScale;
			//перевод координат Y в –о
			double Ro = R + (Dir * p.Y);
			//перевод координат Z
			double Z1 = p.Z;

			//переход от цилиндрических координат в декартовые
			p.X = Ro * cos(Phi);
			p.Y = Ro * sin(Phi);
			p.Z = Z1;
			
			return p;
		}
	};
}
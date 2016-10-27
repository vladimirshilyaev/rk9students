#pragma once

#include "common/common_api.h"

#include "Point.h"

namespace rk9
{
	struct COMMON_API Vector3 {

		double A, B, C;
		
		Vector3() :
			A(0.0),
			B(0.0),
			C(0.0)
		{};

		Vector3(double a, double b, double c) :
			A(a),
			B(b),
			C(c)
		{};

		Vector3(Point p1, Point p2){
			A = p2.X - p1.X;
			B = p2.Y - p1.Y;
			C = p2.Z - p1.Z;
		};

		// Вычисление векторного произведения
		static Vector3 CrossProduct(Vector3 v1, Vector3 v2);

	};
}
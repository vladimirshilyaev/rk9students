#pragma once

#include <vector>

#include "Point.h"
#include "Triangle.h"

namespace Modelling
{
	class PolyModel {
	
		std::vector<Point> Points;
		std::vector<Triangle> Triangles;

	public:
		int ReadFromSTLFile(char * filename);
		int WriteToSTLFile(char * filename);

		void AddTriangle(Point p1, Point p2, Point p3);


	};
}
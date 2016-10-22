
#include <iostream>
#include <vector>
#include "common/PolyModel.h"
#include "common/Point.h"
#include "common/Triangle.h"


using namespace std; 
using namespace rk9;



	int main(int argc, char ** argv) {

		PolyModel pm1, pm2;
		vector<Point>* intersection_points = Intersect(pm1, pm2);


		return 0;
	}
	vector<Point>* Intersect(PolyModel pm1, PolyModel pm2) {


		vector<Point> *points = new vector<Point>;
		unsigned pm1_number = pm1.GetNumberOfTriangles;
		for (unsigned i = 0; i < pm1_number; i++) {

			Point points_of_triangle_i[3] = GetPointsOfTriangle(i, pm1);

			for (unsigned j = 0; j < pm2.Triangles.size(); j++) {

				Point points_of_triangle_j = GetPointsOfTriangle(j, pm2);

				IntersectTriangles(points_of_triangle_i, points_of_triangle_j, points); //нахождения точек пересечения треугольников i,j

			}
		}
		return points;
	}
	void IntersectTriangles(Point(&points_of_triangle_i)[3], Point(&points_of_triangle_j)[3], vector<Point> *points) {

		if (SimpleCheck(points_of_triangle_i[3], points_of_triangle_j[3])) {

			float normal[4];//значения A,B,C,D из уравнения плоскости соответственно

			FindNormal(points_of_triangle_j, normal); //нахождение этих значений

			IntersectEdgeTriangle(points_of_triangle_i[0], points_of_triangle_i[1], points_of_triangle_j, normal, points);  //нахождение точки пересечения прямой(ребра)одного треугольника , заданной двумя
			IntersectEdgeTriangle(points_of_triangle_i[0], points_of_triangle_i[2], points_of_triangle_j, normal, points);  //точками , с плоскостью другого 
			IntersectEdgeTriangle(points_of_triangle_i[1], points_of_triangle_i[2], points_of_triangle_j, normal, points);

			FindNormal(points_of_triangle_i, normal);

			IntersectEdgeTriangle(points_of_triangle_j[0], points_of_triangle_j[1], points_of_triangle_i, normal, points);
			IntersectEdgeTriangle(points_of_triangle_j[0], points_of_triangle_j[2], points_of_triangle_i, normal, points);
			IntersectEdgeTriangle(points_of_triangle_j[1], points_of_triangle_j[2], points_of_triangle_i, normal, points);
		}

	}
	void FindNormal(Point(&trpoints)[3], float(&normal)[4]) {

		float p12x = trpoints[1].X - trpoints[0].X;
		float p12y = trpoints[1].Y - trpoints[0].Y;
		float p12z = trpoints[1].Z - trpoints[0].Z;

		float p13x = trpoints[2].X - trpoints[0].X;
		float p13y = trpoints[2].Y - trpoints[0].Y;
		float p13z = trpoints[2].Z - trpoints[0].Z;

		normal[0] = p12y*p13z - p13y*p12z;
		normal[1] = -p12x*p13z + p13x*p12z;
		normal[2] = p12x*p13y - p13x*p12z;
		normal[3] = -normal[0] * trpoints[1].X - normal[1] * trpoints[1].Y - normal[2] * trpoints[1].Z;


	}
	void IntersectEdgeTriangle(Point p1, Point p2, float(&points_of_triangle_j)[3], float(&normal)[4], vector<Point> &points) {


		float p1 = p2.X - p1.X;
		float p2 = p2.Y - p1.Y;
		float p3 = p2.Z - p1.Z;
		float t0 = (-normal[3] - normal[2] * p1.Z - normal[1] * p1.Y - normal[0] * p1.X) /
			(normal[0] * p1 + normal[1] * p2 + normal[2] * p3);
		if (t0 != 0) //если t =0,то плоскости треугольников параллельны
		{

			float X0 = p1*t0 + p1.X;
			float Y0 = p2*t0 + p1.Y;
			float Z0 = p3*t0 + p1.Z;
			Point pp;
			pp.X = X0;
			pp.Y = Y0;
			pp.Z = Z0;
			if (CheckPointInside(pp, points_of_triangle_j)) // проверка, лежит ли найденная точка пересечения внутри треугольника
			{
				points.push_back(pp);
			}
		}

	}


	// Проверка принадлежности точки треугольнику через площади (Формула Герона)
	bool CheckPointInside(Point pp, float(&tr)[3]) {
		float AB = sqrt(pow(tr[0].X - tr[1].X, 2) + pow(tr[0].Y - tr[1].Y, 2) + pow(tr[0].Z - tr[1].Z, 2));
		float BC = sqrt(pow(tr[1].X - tr[2].X, 2) + pow(tr[1].Y - tr[2].Y, 2) + pow(tr[1].Z - tr[2].Z, 2));
		float AC = sqrt(pow(tr[0].X - tr[2].X, 2) + pow(tr[0].Y - tr[2].Y, 2) + pow(tr[0].Z - tr[2].Z, 2));

		float AP = sqrt(pow(pp.X - tr[0].X, 2) + pow(pp.Y - tr[0].Y, 2) + pow(pp.Z - tr[0].Z, 2));
		float BP = sqrt(pow(pp.X - tr[1].X, 2) + pow(pp.Y - tr[1].Y, 2) + pow(pp.Z - tr[1].Z, 2));
		float CP = sqrt(pow(pp.X - tr[2].X, 2) + pow(pp.Y - tr[2].Y, 2) + pow(pp.Z - tr[2].Z, 2));

		float diff = TriangleSquare(AP, BP, AB) + TriangleSquare(AP, CP, AC) + TriangleSquare(BP, CP, BC) - TriangleSquare(AB, BC, AC);

		if (diff == 0)
			return true;
	}


	float TriangleSquare(float a, float b, float c) {
		float p = (a + b + c) / 2;
		return sqrt(p*(p - a)*(p - b)*(p - c));
	}
	bool SimpleCheck(float(&tr1)[3], float(&tr2)[3]) {

		if ((tr1[0].X < tr2[0].X && tr1[0].Y < tr2[0].Y && tr1[0].Z < tr2[0].Z&&
			tr1[0].X < tr2[1].X && tr1[0].Y < tr2[1].Y && tr1[0].Z < tr2[1].Z&&
			tr1[0].X < tr2[2].X && tr1[0].Y < tr2[2].Y && tr1[0].Z < tr2[2].Z&&
			tr1[1].X < tr2[0].X && tr1[1].Y < tr2[0].Y && tr1[1].Z < tr2[0].Z&&
			tr1[1].X < tr2[1].X && tr1[1].Y < tr2[1].Y && tr1[1].Z < tr2[1].Z&&
			tr1[1].X < tr2[2].X && tr1[1].Y < tr2[2].Y && tr1[1].Z < tr2[2].Z&&
			tr1[2].X < tr2[0].X && tr1[2].Y < tr2[0].Y && tr1[2].Z < tr2[0].Z&&
			tr1[2].X < tr2[1].X && tr1[2].Y < tr2[1].Y && tr1[2].Z < tr2[1].Z&&
			tr1[2].X < tr2[2].X && tr1[2].Y < tr2[2].Y && tr1[2].Z < tr2[2].Z)
			||
			(tr1[0].X > tr2[0].X && tr1[0].Y > tr2[0].Y && tr1[0].Z > tr2[0].Z&&
				tr1[0].X > tr2[1].X && tr1[0].Y > tr2[1].Y && tr1[0].Z > tr2[1].Z&&
				tr1[0].X > tr2[2].X && tr1[0].Y > tr2[2].Y && tr1[0].Z > tr2[2].Z&&
				tr1[1].X > tr2[0].X && tr1[1].Y > tr2[0].Y && tr1[1].Z > tr2[0].Z&&
				tr1[1].X > tr2[1].X && tr1[1].Y > tr2[1].Y && tr1[1].Z > tr2[1].Z&&
				tr1[1].X > tr2[2].X && tr1[1].Y > tr2[2].Y && tr1[1].Z > tr2[2].Z&&
				tr1[2].X > tr2[0].X && tr1[2].Y > tr2[0].Y && tr1[2].Z > tr2[0].Z&&
				tr1[2].X > tr2[1].X && tr1[2].Y > tr2[1].Y && tr1[2].Z > tr2[1].Z&&
				tr1[2].X > tr2[2].X && tr1[2].Y > tr2[2].Y && tr1[2].Z > tr2[2].Z))
			return true;

	}
	Point *points_of_triangle GetPointsOfTriangle(unsigned j, PolyModel pm) {
		


	}

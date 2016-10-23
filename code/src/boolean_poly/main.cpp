
#include <iostream>
#include <vector>
#include "common/PolyModel.h"
#include "common/Point.h"
#include "common/Triangle.h"




using namespace std; 
using namespace rk9;

vector<Point>* Intersect(PolyModel, PolyModel);
void IntersectTriangles(Point *, Point *, vector<Point> *);
void IntersectEdgeTriangle(Point, Point, Point *, float *, vector<Point> *);
bool CheckPointInside(Point, Point*);
float TriangleSquare(float , float , float);
bool SimpleCheck(Point *, Point *);
float* FindNormal(Point *);

	int main(int argc, char ** argv) {

		PolyModel pm1, pm2;
		
		vector<Point> *intersection_points = Intersect(pm1, pm2);
		
		return 0;
	}
	vector<Point>* Intersect(PolyModel pm1, PolyModel pm2) {


		vector<Point> *points = new vector<Point>;
		
		unsigned pm1_number = pm1.GetNumberOfTriangles();
		unsigned pm2_number = pm2.GetNumberOfTriangles();
		for (unsigned i = 0; i < pm1_number; i++) {

			Point *points_of_triangle_i = pm1.GetPointsOfTriangle(i);
			
			for (unsigned j = 0; j < pm2_number; j++) {

				Point *points_of_triangle_j = pm2.GetPointsOfTriangle(j);
				
				IntersectTriangles(points_of_triangle_i, points_of_triangle_j, points); //points of intersection of 2 triangles

			}
		}
		return points;
	}
	void IntersectTriangles(Point *points_of_triangle_i, Point *points_of_triangle_j, vector<Point> *points) {
		
		if (SimpleCheck(points_of_triangle_i, points_of_triangle_j)==false) {

			float *normal = FindNormal(points_of_triangle_j); //find parameters A,B,C,D of normal
			
			IntersectEdgeTriangle(points_of_triangle_i[0], points_of_triangle_i[1], points_of_triangle_j, normal, points);  //finding the intersection between the edge of 
			IntersectEdgeTriangle(points_of_triangle_i[0], points_of_triangle_i[2], points_of_triangle_j, normal, points);  //one triangle and plane of another
			IntersectEdgeTriangle(points_of_triangle_i[1], points_of_triangle_i[2], points_of_triangle_j, normal, points);

			normal = FindNormal(points_of_triangle_i);
			
			IntersectEdgeTriangle(points_of_triangle_j[0], points_of_triangle_j[1], points_of_triangle_i, normal, points);
			IntersectEdgeTriangle(points_of_triangle_j[0], points_of_triangle_j[2], points_of_triangle_i, normal, points);
			IntersectEdgeTriangle(points_of_triangle_j[1], points_of_triangle_j[2], points_of_triangle_i, normal, points);
		}

	}
	
	void IntersectEdgeTriangle(Point point1, Point point2, Point *points_of_triangle_j, float *normal, vector<Point> *points) {


		float p1 = point2.X - point1.X;
		float p2 = point2.Y - point1.Y;
		float p3 = point2.Z - point1.Z;
		if ((normal[0] * p1 + normal[1] * p2 + normal[2] * p3) != 0) {   //if A*p1+B*p2+C*p3=0 so line lies in plane or paralells it


			float t0 = (-normal[3] - normal[2] * point1.Z - normal[1] * point1.Y - normal[0] * point1.X) /
				(normal[0] * p1 + normal[1] * p2 + normal[2] * p3);
			
			float X0 = p1*t0 + point1.X;
			float Y0 = p2*t0 + point1.Y;
			float Z0 = p3*t0 + point1.Z;

			Point pp;
			pp.X = X0;
			pp.Y = Y0;
			pp.Z = Z0;

			if (CheckPointInside(pp, points_of_triangle_j)) // check if finded point lies in triangle 
			{
				points->push_back(pp);
			}

		}
	}


	
	bool CheckPointInside(Point pp, Point *tr) {
		float AB = sqrt(pow(tr[0].X - tr[1].X, 2) + pow(tr[0].Y - tr[1].Y, 2) + pow(tr[0].Z - tr[1].Z, 2));
		float BC = sqrt(pow(tr[1].X - tr[2].X, 2) + pow(tr[1].Y - tr[2].Y, 2) + pow(tr[1].Z - tr[2].Z, 2));
		float AC = sqrt(pow(tr[0].X - tr[2].X, 2) + pow(tr[0].Y - tr[2].Y, 2) + pow(tr[0].Z - tr[2].Z, 2));

		float AP = sqrt(pow(pp.X - tr[0].X, 2) + pow(pp.Y - tr[0].Y, 2) + pow(pp.Z - tr[0].Z, 2));
		float BP = sqrt(pow(pp.X - tr[1].X, 2) + pow(pp.Y - tr[1].Y, 2) + pow(pp.Z - tr[1].Z, 2));
		float CP = sqrt(pow(pp.X - tr[2].X, 2) + pow(pp.Y - tr[2].Y, 2) + pow(pp.Z - tr[2].Z, 2));

		float diff = TriangleSquare(AP, BP, AB) + TriangleSquare(AP, CP, AC) + TriangleSquare(BP, CP, BC) - TriangleSquare(AB, BC, AC);

		if (diff == 0)
			return true;
		else false;
	}


	float TriangleSquare(float a, float b, float c) {
		float p = (a + b + c) / 2;
		return sqrt(p*(p - a)*(p - b)*(p - c));
	}
	bool SimpleCheck(Point *tr1, Point *tr2) {
		
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
	float* FindNormal(Point *tr) {

		float *params = new float[4];


		float p12x = tr[1].X - tr[0].X;
		float p12y = tr[1].Y - tr[0].Y;
		float p12z = tr[1].Z - tr[0].Z;

		float p13x = tr[2].X - tr[0].X;
		float p13y = tr[2].Y - tr[0].Y;
		float p13z = tr[2].Z - tr[0].Z;

		params[0] = p12y*p13z - p13y*p12z;
		params[1] = -p12x*p13z + p13x*p12z;
		params[2] = p12x*p13y - p13x*p12z;
		params[3] = -params[0] * tr[1].X - params[1] * tr[1].Y - params[2] * tr[1].Z;

		return params;
	}

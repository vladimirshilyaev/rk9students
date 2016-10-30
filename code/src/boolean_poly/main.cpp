#include <vector>

#include "common/PolyModel.h"
#include "common/Point.h"
#include "common/Triangle.h"

using namespace std;
using namespace rk9;

// Поиск пересечения двух многогранников
// model_a, model_b - исходные модели
// Возвращает координаты точек, образующих контур пересечения
vector<Point> GetIntersectionPoints(PolyModel model_a, PolyModel model_b);

void IntersectTriangles(Triangle tr1, Triangle tr2, vector<Point>& );
void IntersectEdgeTriangle(Point, Point, Triangle tr, vector<Point>& );

bool IsPlaneBetweenTriangle(Triangle tr1 , Triangle tr2 );


const double EPSILON = 1E-10;

int main(int argc, char ** argv) {

	PolyModel model_a, model_b,modelc,modeld;

	/*Point p1, p2, p3,p4,p5,p6; 
	p1.X = 0; p1.Y = 0; p1.Z = 0;
	p2.X = 5; p2.Y = 0; p2.Z = 0;
	p3.X = 2.5; p3.Y = 5; p3.Z = 0;
	p4.X = 5; p4.Y = 1; p4.Z = 1;
	p5.X = 2.5; p5.Y = 1; p5.Z = -3;
	p6.X = 0; p6.Y = 1; p6.Z = -3;
	model_a.AddTriangle(p1, p2, p3);
	
	model_b.AddTriangle(p4, p5, p6);*/

	model_a.ReadFromSTLFile(argv[1]);
	model_b.ReadFromSTLFile(argv[2]);


	vector<Point> intersection_points= GetIntersectionPoints(model_a, model_b);
	for(unsigned i;i<intersection_points.size();i++)
	return 0;
}

vector<Point> GetIntersectionPoints(PolyModel model_a, PolyModel model_b) {

	vector<Point> points;

	unsigned triangles_count_A = model_a.GetTrianglesCount();
	unsigned triangles_count_B = model_b.GetTrianglesCount();

	for (unsigned i = 0; i < triangles_count_A; i++) {

		Triangle tr1 = model_a.GetTriangleVertices(i);
		for (unsigned j = 0; j < triangles_count_B; j++) {

			Triangle tr2 = model_b.GetTriangleVertices(j);
			if (IsPlaneBetweenTriangle(tr1, tr2) != true) {
				//points of intersection of 2 triangles
				IntersectTriangles(tr1, tr2, points);
			}
		}
		
	}
	return points;
}


void IntersectTriangles(Triangle tr1, Triangle tr2, vector<Point> &points) {

		IntersectEdgeTriangle(tr1.A, tr1.B, tr2,  points);  //finding the intersection between the edge of 
		IntersectEdgeTriangle(tr1.A, tr1.C, tr2,  points);  //one triangle and plane of another
		IntersectEdgeTriangle(tr1.B, tr1.C, tr2,  points);
												
		IntersectEdgeTriangle(tr2.A, tr2.B, tr1,  points);
		IntersectEdgeTriangle(tr2.A, tr2.C, tr1,  points);
		IntersectEdgeTriangle(tr2.B, tr2.C, tr1,  points);
	
}

void IntersectEdgeTriangle(Point point1, Point point2, Triangle tr, vector<Point> &points) {

	Plane plane = tr.GetPlane();
	/*double p1 = point2.X - point1.X;
	double p2 = point2.Y - point1.Y;
	double p3 = point2.Z - point1.Z;
	if ((plane.A * p1 + plane.B * p2 + plane.C * p3) != 0) {   //if A*p1+B*p2+C*p3=0 so line lies in plane or paralells it

		double t0 = (-plane.D - plane.C * point1.Z - plane.B * point1.Y - plane.A * point1.X) /
			(plane.A * p1 + plane.B * p2 + plane.C * p3);

		double X0 = p1*t0 + point1.X;
		double Y0 = p2*t0 + point1.Y;
		double Z0 = p3*t0 + point1.Z;*/

			//pp.X = X0;
			//pp.Y = Y0;
			//pp.Z = Z0;
	Point pp;
	if (plane.GetIntersectionWithLine(point1, point2, pp) && !false)
	{
		if (tr.IsPointInsideTriangle(pp)) // check if finded point lies in triangle 
		{
			points.push_back(pp);
		}
	}

	
}


//check if there may be plane between triangles(all points of tr1 are on the one side of points of tr2)
bool IsPlaneBetweenTriangle(Triangle tr1, Triangle tr2) {
	
	if ((tr1.A.X < tr2.A.X && tr1.A.Y < tr2.A.Y && tr1.A.Z < tr2.A.Z&&
		 tr1.A.X < tr2.B.X && tr1.A.Y < tr2.B.Y && tr1.A.Z < tr2.B.Z&&
		 tr1.A.X < tr2.C.X && tr1.A.Y < tr2.C.Y && tr1.A.Z < tr2.C.Z&&
		 tr1.B.X < tr2.A.X && tr1.B.Y < tr2.A.Y && tr1.B.Z < tr2.A.Z&&
		 tr1.B.X < tr2.B.X && tr1.B.Y < tr2.B.Y && tr1.B.Z < tr2.B.Z&&
		 tr1.B.X < tr2.C.X && tr1.B.Y < tr2.C.Y && tr1.B.Z < tr2.C.Z&&
		 tr1.C.X < tr2.A.X && tr1.C.Y < tr2.A.Y && tr1.C.Z < tr2.A.Z&&
		 tr1.C.X < tr2.B.X && tr1.C.Y < tr2.B.Y && tr1.C.Z < tr2.B.Z&&
		 tr1.C.X < tr2.C.X && tr1.C.Y < tr2.C.Y && tr1.C.Z < tr2.C.Z)
		 ||
		(tr1.A.X > tr2.A.X && tr1.A.Y > tr2.A.Y && tr1.A.Z > tr2.A.Z&&
		 tr1.A.X > tr2.B.X && tr1.A.Y > tr2.B.Y && tr1.A.Z > tr2.B.Z&&
		 tr1.A.X > tr2.C.X && tr1.A.Y > tr2.C.Y && tr1.A.Z > tr2.C.Z&&
		 tr1.B.X > tr2.A.X && tr1.B.Y > tr2.A.Y && tr1.B.Z > tr2.A.Z&&
		 tr1.B.X > tr2.B.X && tr1.B.Y > tr2.B.Y && tr1.B.Z > tr2.B.Z&&
		 tr1.B.X > tr2.C.X && tr1.B.Y > tr2.C.Y && tr1.B.Z > tr2.C.Z&&
		 tr1.C.X > tr2.A.X && tr1.C.Y > tr2.A.Y && tr1.C.Z > tr2.A.Z&&
		 tr1.C.X > tr2.B.X && tr1.C.Y > tr2.B.Y && tr1.C.Z > tr2.B.Z&&
		 tr1.C.X > tr2.C.X && tr1.C.Y > tr2.C.Y && tr1.C.Z > tr2.C.Z))

		return true;

}


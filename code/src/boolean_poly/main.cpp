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
bool IsTheSamePoints(Point p1, Point p2);
void IntersectTriangles(Triangle tr1, Triangle tr2, vector<Point>& intersection_points);
void IntersectEdgeTriangle(Point, Point, Triangle tr1,Triangle tr2, vector<Point>& intersection_points);
bool IsPlaneBetweenTriangle(Triangle tr1, Triangle tr2);
void DeleteSamePoints(vector<Point>& intersection_points);


const double EPSILON = 1E-10;

int main(int argc, char ** argv) {

	PolyModel model_a, model_b;

	model_a.ReadFromSTLFile(argv[1]); 
	model_b.ReadFromSTLFile(argv[2]); 
	
	vector<Point> intersection_points = GetIntersectionPoints(model_a, model_b);
	DeleteSamePoints(intersection_points);

	//Из-за того, что модель состоит из треугольников, а в результате пересечения 
	//мы получаем массив с количеством точек, не обязательно кратным 3, приходится 
	//дублировать 1 или 2 точки, чтобы записать этот массив в STL-модель и отобразить рез-т
	intersection_points.push_back(intersection_points[4]);
	PolyModel modelz;
	for (int i = 0; i < intersection_points.size() - 2; i += 3)
		modelz.AddTriangle(intersection_points[i], intersection_points[i + 1], intersection_points[i+2] );
	
	modelz.WriteToSTLFile(argv[3]);

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
				IntersectTriangles(tr1, tr2, points);//points of intersection of 2 triangles 
			}
		}
	}
	return points;
}

//finding the intersection between the edge of one triangle and plane of another
void IntersectTriangles(Triangle tr1, Triangle tr2, vector<Point> &points) {
	IntersectEdgeTriangle(tr1.A, tr1.B, tr2,tr1, points); 
	IntersectEdgeTriangle(tr1.A, tr1.C, tr2,tr1, points);  
	IntersectEdgeTriangle(tr1.B, tr1.C, tr2,tr1, points);
											
	IntersectEdgeTriangle(tr2.A, tr2.B, tr1,tr2, points);
	IntersectEdgeTriangle(tr2.A, tr2.C, tr1,tr2, points);
	IntersectEdgeTriangle(tr2.B, tr2.C, tr1,tr2, points);
}


void IntersectEdgeTriangle(Point point1, Point point2, Triangle tr1,Triangle tr2, vector<Point> &points) {
	Plane plane = tr1.GetPlane();
	Point intersect_point;
	if (plane.GetIntersectionWithLine(point1, point2, intersect_point))
	{
		if ((tr1.IsPointInsideTriangle(intersect_point) ==true)&&// check if finded point lies in triangles
			(tr2.IsPointInsideTriangle(intersect_point) == true))  
		{
			points.push_back(intersect_point);
		}
	}
}

//check if there may be plane between triangles(all points of tr1 are on the one side of points of tr2) 
bool IsPlaneBetweenTriangle(Triangle tr1, Triangle tr2) {
	if (((tr1.A.X <tr2.A.X) &&( tr1.A.Y < tr2.A.Y) &&( tr1.A.Z<tr2.A.Z)&& 
		 (tr1.A.X <tr2.B.X) &&( tr1.A.Y < tr2.B.Y) &&( tr1.A.Z<tr2.B.Z)&& 
		 (tr1.A.X <tr2.C.X) &&( tr1.A.Y < tr2.C.Y) &&( tr1.A.Z<tr2.C.Z)&& 
		 (tr1.B.X <tr2.A.X) &&( tr1.B.Y < tr2.A.Y) &&( tr1.B.Z<tr2.A.Z)&& 
		 (tr1.B.X <tr2.B.X) &&( tr1.B.Y < tr2.B.Y) &&( tr1.B.Z<tr2.B.Z)&& 
		 (tr1.B.X <tr2.C.X) &&( tr1.B.Y < tr2.C.Y) &&( tr1.B.Z<tr2.C.Z)&& 
		 (tr1.C.X <tr2.A.X) &&( tr1.C.Y < tr2.A.Y) &&( tr1.C.Z<tr2.A.Z)&& 
		 (tr1.C.X <tr2.B.X) &&( tr1.C.Y < tr2.B.Y) &&( tr1.C.Z<tr2.B.Z)&& 
		 (tr1.C.X <tr2.C.X) &&( tr1.C.Y < tr2.C.Y) &&( tr1.C.Z<tr2.C.Z))
		||		 	
		((tr1.A.X > tr2.A.X)&& (tr1.A.Y > tr2.A.Y )&& (tr1.A.Z > tr2.A.Z)&&
		 (tr1.A.X > tr2.B.X)&& (tr1.A.Y > tr2.B.Y )&& (tr1.A.Z > tr2.B.Z)&&
		 (tr1.A.X > tr2.C.X)&& (tr1.A.Y > tr2.C.Y )&& (tr1.A.Z > tr2.C.Z)&&
		 (tr1.B.X > tr2.A.X)&& (tr1.B.Y > tr2.A.Y )&& (tr1.B.Z > tr2.A.Z)&&
		 (tr1.B.X > tr2.B.X)&& (tr1.B.Y > tr2.B.Y )&& (tr1.B.Z > tr2.B.Z)&&
		 (tr1.B.X > tr2.C.X)&& (tr1.B.Y > tr2.C.Y )&& (tr1.B.Z > tr2.C.Z)&&
		 (tr1.C.X > tr2.A.X)&& (tr1.C.Y > tr2.A.Y )&& (tr1.C.Z > tr2.A.Z)&&
		 (tr1.C.X > tr2.B.X)&& (tr1.C.Y > tr2.B.Y )&& (tr1.C.Z > tr2.B.Z)&&
		 (tr1.C.X > tr2.C.X)&& (tr1.C.Y > tr2.C.Y )&& (tr1.C.Z > tr2.C.Z)))
		 return true;
	else return false;

}

//Check if points are the same
bool IsTheSamePoints(Point p1, Point p2)
{
	if ((p1.X == p2.X) && (p1.Y == p2.Y) && (p2.Z == p1.Z))
	{
		return true;
	}
	else return false;
}

//delete same points in array of intersection points
void DeleteSamePoints(vector<Point>& points)
{
	for (int i = 0; i<points.size() - 1; i++) {
		for (int j = i + 1; j < points.size(); j++)
		{
			if ((IsTheSamePoints(points[i], points[j])) == true)
			{
				points.erase(points.begin() + j);
				j--;
			}
		}
	}
}

using namespace std;
#include <vector>
int main(int argc, char ** argv) {

	return 0;
}
vector<float> Intersect(PolyModel pm1, PolyModel pm2) {
	vector<Point> points;  //массив, в который запишутся все точки пересечения моделей

	for (unsigned i = 0; i < pm1.Triangles.size();i++) {

		for (unsigned j = 0; j < pm2.Triangles.size(); j++) {

			IntersectTriangles(pm1, pm2, points,i,j); //нахождения точек пересечения треугольников i,j
			IntersectTriangles(pm1, pm2, points, j,i);
		}
	}
	return points;
}
void IntersectTriangles(PolyModel pm1,PolyModel pm2, vector<Point> points,int i,int j) {

	float normal[4]; //значения A,B,C,D из уравнения плоскости соответственно
	FindNormal(pm2, j, normal); //нахождение этих значений

	IntersectEdgeTriangle(i*3, i*3 + 1, j,normal,pm1,points);  //нахождение точки пересечения прямой(ребра)одного треугольника , заданной двумя
	IntersectEdgeTriangle(i*3, i*3 + 2,j,normal, pm1, points);  //точками , с плоскостью другого 
	IntersectEdgeTriangle(i*3+1, i*3 + 2,j,normal, pm1, points);

}
void FindNormal(PolyModel pm,int i,float normal[4]) {
	
	float p12x = pm.Points[i * 3 + 1].X - pm.Points[i * 3].X;
	float p12y = pm.Points[i * 3 + 1].Y - pm.Points[i * 3].Y;
	float p12z = pm.Points[i * 3 + 1].Z - pm.Points[i * 3].Z;

	float p13x = pm.Points[i * 3 + 2].X - pm.Points[i * 3].X;
	float p13y = pm.Points[i * 3 + 2].Y - pm.Points[i * 3].Y;
	float p13z = pm.Points[i * 3 + 2].Z - pm.Points[i * 3].Z;
	
	normal[0] = p12y*p13z - p13y*p12z;
	normal[1] = -p12x*p13z + p13x*p12z;
	normal[2] = p12x*p13y - p13x*p12z;
	normal[3] = -normal[0]* pm.Points[i * 3 + 1].X - normal[1] * pm.Points[i * 3 + 1].Y - normal[2] * pm.Points[i * 3 + 1].Z;
	

}
void IntersectEdgeTriangle(int i, int j, int k,float normal[4], PolyModel pm1,PolyModel pm2, vector<Point> points) {

	
	float p1 = pm1.Points[i].X - pm1.Points[j].X;
	float p2 = pm1.Points[i].Y - pm1.Points[j].Y;
	float p3 = pm1.Points[i].Z - pm1.Points[j].Z;
	float t0 = (-normal[3] - normal[2] * pm1.Points[i].Z - normal[1] * pm1.Points[i].Y - normal[0] * pm1.Points[i].X) /
		(normal[0] * p1 + normal[1] * p2 + normal[2] * p3);
	if (t0 != 0) //если t =0,то плоскости треугольников параллельны
	{

		float X0 = p1*t0 + pm1.Points[i].X;
		float Y0 = p2*t0 + pm1.Points[i].Y;
		float Z0 = p3*t0 + pm1.Points[i].Z;
		Point pp;
		pp.X = X0;
		pp.Y = Y0;
		pp.Z = Z0;
		if (CheckPointInside(pp, pm2, k)) // проверка, лежит ли найденная точка пересечения внутри треугольника
		{
			points.push_back(pp);
		}
	}

}


// Проверка принадлежности точки треугольнику через площади (Формула Герона)
bool CheckPointInside(Point pp, PolyModel pm2, int j) {
	float AB = sqrt(pow(pm2.Points[j].X - pm2.Points[j + 1].X,2)  + pow(pm2.Points[j].Y - pm2.Points[j + 1].Y,2)  + pow(pm2.Points[j].Z - pm2.Points[j + 1].Z,2) );
	float BC = sqrt(pow(pm2.Points[j + 1].X - pm2.Points[j + 2].X,2) + pow(pm2.Points[j + 1].Y - pm2.Points[j + 2].Y,2)  + pow(pm2.Points[j + 1].Z - pm2.Points[j + 2].Z,2) );
	float AC = sqrt(pow(pm2.Points[j].X - pm2.Points[j + 2].X,2)  + pow(pm2.Points[j].Y - pm2.Points[j + 2].Y,2)  + pow(pm2.Points[j].Z - pm2.Points[j + 2].Z,2) );

	float AP = sqrt(pow(pp.X - pm2.Points[j].X,2)  + pow(pp.Y - pm2.Points[j].Y,2)  +pow(pp.Z - pm2.Points[j].Z,2) );
	float BP = sqrt(pow(pp.X - pm2.Points[j + 1].X,2)  + pow(pp.Y - pm2.Points[j + 1].Y,2)  + pow(pp.Z - pm2.Points[j + 1].Z,2));
	float CP = sqrt(pow(pp.X - pm2.Points[j + 2].X,2)  + pow(pp.Y - pm2.Points[j + 2].Y,2)  + pow(pp.Z - pm2.Points[j + 2].Z,2));

	float diff = TriangleSquare(AP, BP, AB) + TriangleSquare(AP, CP, AC) + TriangleSquare(BP, CP, BC) - TriangleSquare(AB, BC, AC);

	return diff == 0;
};


float TriangleSquare(float a, float b, float c) {
	float p = (a + b + c) / 2;
	return sqrt(p*(p - a)*(p - b)*(p - c));
}
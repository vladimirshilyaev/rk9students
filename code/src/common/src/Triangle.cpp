#include "common/Triangle.h"
#include "common/Plane.h"


using namespace std;

namespace rk9
{
	//find parameters A,B,C,D of normal.
	//Vector3 Triangle::GetNormal() {
	//	Plane p = GetPlane();
	//	return Vector3(p.A, p.B, p.C);
	//};

	//Plane Triangle::GetPlane() {
	//	double A, B, C, D;

	//	//find coordinates of vectors of triangle's vertices
	//	Vector3 v01(Verts[0], Verts[1]);
	//	Vector3 v02(Verts[0], Verts[2]);

	//	Vector3 product = Vector3::CrossProduct(v01, v02);

	//	A = product.A;
	//	B = product.B;
	//	C = product.C;

	//	D = -A * Verts[1].X - B * Verts[1].Y - C * Verts[1].Z;

	//	return Plane(A, B, C, D);
	//};
}
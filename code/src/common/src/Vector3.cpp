#include "common/Vector3.h"

namespace rk9
{

	Vector3 Vector3::CrossProduct(Vector3 v1, Vector3 v2){
		return Vector3(
			 v1.B * v2.C - v2.B * v1.C,
			-v1.A * v2.C + v2.A * v1.C,
			 v1.A * v2.B - v2.A * v1.C
		);
	}

}
#include "gtest/gtest.h"
#include "common/Plane.h"
#include "common/Vector3.h"

using namespace std;
using namespace rk9;

TEST(PlaneTest, GetIntersectionWithLineTest) {
	Plane p{ 1, 0, 0, 0 }; // x=0
	Point res;

	EXPECT_TRUE(
		p.GetIntersectionWithLine(Point{ -10, 0, 0 }, 
			Point{ 10, 0, 0 }, 
			res));

	Point eq{ 0, 0, 0 };

	EXPECT_EQ(res, eq);

	EXPECT_FALSE(
		p.GetIntersectionWithLine(Point{ -10, 0, 0 },
			Point{ -10, 50, 0 },
			res));
}

TEST(CrossProductTest, VectorTest) {
	Vector3 v1{ 1, 0, 0 }, 
			v2{ 0, 1, 0 },
			v3{ 0, 0, 1 },
			v4;

	v4 = Vector3::CrossProduct(v1, v2);

	EXPECT_EQ(v4, v3);

}
#include "gtest/gtest.h"
#include "common/Plane.h"

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

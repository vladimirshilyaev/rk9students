#include <algorithm>
#include <string>

#include "gtest/gtest.h"
#include ""

using namespace std;
using namespace rk9;

TEST(PlaneTest, GetIntersectionWithLineTest) {

}


TEST(cpp_sorter_test, null_term_str_sort)
{
	string s{ "abcdefghab" };
	string eq{ "aabbcdefgh" };

	sort(s.begin(), s.end()); //, [](auto a, auto b) {return a < b; }

	EXPECT_EQ(s, eq);
}

TEST(cpp_sorter_test, char_arr_sort)
{
    vector<char> c {'a','b','c','d','e','f','g','h','a','b'};
	vector<char> eq {'a','a','b','b','c','d','e','f','g','h'};
    
	sort(c.begin(), c.end());

	EXPECT_EQ(c, eq);
}

TEST(cpp_sorter_test, int_arr_sort)
{
	vector<int> a {9,8,7,6,5,4,3,2,1,0};
	vector<int> eq {0,1,2,3,4,5,6,7,8,9};
	
	sort(a.begin(), a.end());
	   
	EXPECT_EQ(a, eq);
}

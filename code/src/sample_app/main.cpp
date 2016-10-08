#include <iostream>
#include "common/PolyModel.h"

using namespace rk9;

int main(int /*argc*/, char* /*argv*/[])
{
	
	PolyModel in_model;

	// A simple usage example:
	// Read a model from file,
	// Add one more triangle,
	// then write the model 
	// to another file.

	in_model.ReadFromSTLFile("input.stl");

	in_model.AddTriangle(Point{ 0.0, 0.0, 0.0 }, Point{ 0.0, 1.0, 0.0 }, Point{ 0.0, 0.0, 1.0 });

	in_model.WriteToSTLFile("output.stl");

	return 0;
}

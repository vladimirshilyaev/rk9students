﻿#include <math.h>
#include <time.h>
#include <memory.h>
#include <stdlib.h>
#include <float.h>
#include <cmath>
#include <limits>
#include <iostream>
#include "MarchingCubes.h"
#include "LookUpTable.h"

bool test_interior(int8_t s, uint8_t config_case, uint8_t config,
	uint8_t subconfig, const float *cube);

void print_cube(const float *cube)
{
	std::cout << "\t";
	for (int i = 0; i < 8; ++i) {
		std::cout << cube[i] << " ";
	}
	std::cout << "\n";
}

MarchingCubes::MarchingCubes(const glm::ivec3 &size, Algorithm algorithm)
	: algorithm_(algorithm), size_(size)
{
}

void MarchingCubes::run(float iso)
{
	clock_t time = clock();

	compute_intersection_points(iso);

	for (int k = 0; k < size_.z - 1; ++k) {
		for (int j = 0; j < size_.y - 1; ++j) {
			for (int i = 0; i < size_.x - 1; ++i) {
				float cube[8];
				// cube sign representation in [0..255]
				auto lut_entry = uint8_t{ 0 };
				for (int p = 0; p < 8; ++p) {
					auto grid_coord =
						glm::ivec3(i + ((p ^ (p >> 1)) & 1), j + ((p >> 1) & 1),
							k + ((p >> 2) & 1));
					cube[p] = get_data(grid_coord) - iso;
					if (std::abs(cube[p]) <
						std::numeric_limits<float>::epsilon()) {
						cube[p] = std::numeric_limits<float>::epsilon();
					}
					if (cube[p] > 0) lut_entry += 1 << p;
				}

				ProcessCube(glm::ivec3(i, j, k), lut_entry, cube);
			}
		}
	}

	std::cout << "Marching Cubes ran in "
		<< ((double)(clock() - time) / CLOCKS_PER_SEC) << " secs.\n";
}

void MarchingCubes::Setup()
{
	data_.resize(size_.x * size_.y * size_.z);
	auto estimated_vertex_count = size_.x * size_.y * size_.z / 2;
	x_verts_.reserve(estimated_vertex_count);
	y_verts_.reserve(estimated_vertex_count);
	z_verts_.reserve(estimated_vertex_count);
}

void CleanIsoDenormals(float *cube)
{
	if (std::abs(cube[0]) < std::numeric_limits<float>::epsilon()) {
		cube[0] = std::numeric_limits<float>::epsilon();
	}
	if (std::abs(cube[1]) < std::numeric_limits<float>::epsilon()) {
		cube[1] = std::numeric_limits<float>::epsilon();
	}
	if (std::abs(cube[3]) < std::numeric_limits<float>::epsilon()) {
		cube[3] = std::numeric_limits<float>::epsilon();
	}
	if (std::abs(cube[4]) < std::numeric_limits<float>::epsilon()) {
		cube[4] = std::numeric_limits<float>::epsilon();
	}
}

// Compute the intersection points
void MarchingCubes::compute_intersection_points(float iso)
{
	for (int k = 0; k < size_.z; k++)
		for (int j = 0; j < size_.y; j++)
			for (int i = 0; i < size_.x; i++) {
				float cube[8];
				auto grid_coord = glm::ivec3(i, j, k);

				cube[0] = get_data(grid_coord) - iso;
				if (i < size_.x - 1) {
					cube[1] = get_data(glm::ivec3(i + 1, j, k)) - iso;
				}
				else {
					cube[1] = cube[0];
				}

				if (j < size_.y - 1) {
					cube[3] = get_data(glm::ivec3(i, j + 1, k)) - iso;
				}
				else {
					cube[3] = cube[0];
				}

				if (k < size_.z - 1) {
					cube[4] = get_data(glm::ivec3(i, j, k + 1)) - iso;
				}
				else {
					cube[4] = cube[0];
				}

				CleanIsoDenormals(cube);

				if (cube[0] < 0) {
					if (cube[1] > 0) {
						set_x_vert(add_vertex(grid_coord, glm::ivec3(1, 0, 0),
							1, cube),
							grid_coord);
					}
					if (cube[3] > 0) {
						set_y_vert(add_vertex(grid_coord, glm::ivec3(0, 1, 0),
							3, cube),
							grid_coord);
					}
					if (cube[4] > 0) {
						set_z_vert(add_vertex(grid_coord, glm::ivec3(0, 0, 1),
							4, cube),
							grid_coord);
					}
				}
				else {
					if (cube[1] < 0) {
						set_x_vert(add_vertex(grid_coord, glm::ivec3(1, 0, 0),
							1, cube),
							grid_coord);
					}
					if (cube[3] < 0) {
						set_y_vert(add_vertex(grid_coord, glm::ivec3(0, 1, 0),
							3, cube),
							grid_coord);
					}
					if (cube[4] < 0) {
						set_z_vert(add_vertex(grid_coord, glm::ivec3(0, 0, 1),
							4, cube),
							grid_coord);
					}
				}
			}
}

// tests if the components of the tesselation of the cube should be connected by
// the interior of an ambiguous face
// Test a face
// if face>0 return true if the face contains a part of the surface
bool test_face(int8_t face, float *cube)
{
	static int corner_lookup[6][4] = { { 0, 4, 5, 1 },{ 1, 5, 6, 2 },{ 2, 6, 7, 3 },
	{ 3, 7, 4, 0 },{ 0, 3, 2, 1 },{ 4, 7, 6, 5 } };

	auto idx = std::abs(face) - 1;
	auto corners = corner_lookup[idx];
	auto A = cube[corners[0]];
	auto B = cube[corners[1]];
	auto C = cube[corners[2]];
	auto D = cube[corners[3]];

	if (std::abs(A * C - B * D) < std::numeric_limits<float>::epsilon()) {
		return face >= 0;
	}

	// face and A invert signs
	return face * A * (A * C - B * D) >= 0.f;
}

// tests if the components of the tesselation of the cube should be connected
// through the interior of the cube
// Test the interior of a cube
// if s == 7, return true  if the interior is empty
// if s ==-7, return false if the interior is empty
bool test_interior(int8_t s, uint8_t config_case, uint8_t config,
	uint8_t subconfig, const float *cube)
{
	static const uint8_t edge_vertices_t[12][2] = {
		{ 0, 1 },{ 1, 2 },{ 2, 3 },{ 3, 0 },{ 4, 5 },{ 5, 6 },
		{ 6, 7 },{ 7, 4 },{ 0, 4 },{ 1, 5 },{ 2, 6 },{ 3, 7 } };

	static const uint8_t edge_vertices_B[12][2] = {
		{ 3, 2 },{ 0, 3 },{ 1, 0 },{ 2, 1 },{ 7, 6 },{ 4, 7 },
		{ 5, 4 },{ 6, 5 },{ 3, 7 },{ 0, 4 },{ 1, 5 },{ 2, 6 } };

	static const uint8_t edge_vertices_C[12][2] = {
		{ 7, 6 },{ 4, 7 },{ 5, 4 },{ 6, 5 },{ 3, 2 },{ 0, 3 },
		{ 1, 0 },{ 2, 1 },{ 2, 6 },{ 3, 7 },{ 0, 4 },{ 1, 5 } };

	static const uint8_t edge_vertices_D[12][2] = {
		{ 4, 5 },{ 5, 6 },{ 6, 7 },{ 7, 4 },{ 0, 1 },{ 1, 2 },
		{ 2, 3 },{ 3, 0 },{ 1, 5 },{ 2, 6 },{ 3, 7 },{ 0, 4 } };

	float t, At = 0, Bt = 0, Ct = 0, Dt = 0, a, b;
	char test = 0;
	char edge = -1;  // reference edge of the triangulation

	switch (config_case) {
	case 4:
	case 10:
		a = (cube[4] - cube[0]) * (cube[6] - cube[2]) -
			(cube[7] - cube[3]) * (cube[5] - cube[1]);
		b = cube[2] * (cube[4] - cube[0]) + cube[0] * (cube[6] - cube[2]) -
			cube[1] * (cube[7] - cube[3]) - cube[3] * (cube[5] - cube[1]);
		t = -b / (2 * a);
		if (t < 0 || t > 1) return s > 0;

		At = cube[0] + (cube[4] - cube[0]) * t;
		Bt = cube[3] + (cube[7] - cube[3]) * t;
		Ct = cube[2] + (cube[6] - cube[2]) * t;
		Dt = cube[1] + (cube[5] - cube[1]) * t;
		break;

	case 6:
	case 7:
	case 12:
	case 13:
		switch (config_case) {
		case 6:
			edge = test6[config][2];
			break;
		case 7:
			edge = test7[config][4];
			break;
		case 12:
			edge = test12[config][3];
			break;
		case 13:
			edge = tiling13_5_1[config][subconfig][0];
			break;
		}

		{
			auto t0 = cube[edge_vertices_t[edge][0]];
			auto t1 = cube[edge_vertices_t[edge][1]];
			auto B0 = cube[edge_vertices_B[edge][0]];
			auto B1 = cube[edge_vertices_B[edge][1]];
			auto C0 = cube[edge_vertices_C[edge][0]];
			auto C1 = cube[edge_vertices_C[edge][1]];
			auto D0 = cube[edge_vertices_D[edge][0]];
			auto D1 = cube[edge_vertices_D[edge][1]];

			t = t0 / (t0 - t1);
			At = 0.f;
			Bt = glm::mix(B0, B1, t);
			Ct = glm::mix(C0, C1, t);
			Dt = glm::mix(D0, D1, t);
		}
		break;

	default:
		std::cout << " Invalid ambiguous case " << config_case << "\n";
		print_cube(cube);
		break;
	}

	if (At >= 0) test++;
	if (Bt >= 0) test += 2;
	if (Ct >= 0) test += 4;
	if (Dt >= 0) test += 8;
	switch (test) {
	case 0:
	case 1:
	case 2:
	case 3:
	case 4:
	case 6:
	case 8:
	case 9:
	case 12:
		return s > 0;

	case 5:
		if (At * Ct - Bt * Dt < std::numeric_limits<float>::epsilon()) {
			return s > 0;
		}
		break;

	case 10:
		if (At * Ct - Bt * Dt >= std::numeric_limits<float>::epsilon()) {
			return s > 0;
		}
		break;

	case 7:
	case 11:
	case 13:
	case 14:
	case 15:
		return s < 0;
	}

	return s < 0;
}

void MarchingCubes::ProcessCubeTiling13(const glm::ivec3 &grid_coord,
	uint8_t config_case, uint8_t config,
	float *cube)
{
	static const int8_t TILING13_2a_0 = 1;
	static const int8_t TILING13_3a_0 = 7;
	static const int8_t TILING13_4_0 = 19;
	static const int8_t TILING13_5_0 = 23;
	static const int8_t TILING13_3b_0 = 27;
	static const int8_t TILING13_2b_0 = 39;

	auto subconfig = uint8_t{ 0 };
	for (int i = 0; i <= 5; ++i) {
		if (test_face(test13[config][i], cube)) {
			subconfig |= 1 << i;
		}
	}
	auto subcase = subconfig13[subconfig];
	switch (subcase) {
	case 0: /* 13.1 */
		add_triangle(grid_coord, tiling13_1[config], 4);
		break;

		// 13.2a
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6: {
		auto idx = subcase - TILING13_2a_0;
		add_triangle(grid_coord, tiling13_2[config][idx], 6);
	} break;

		// 13.3a
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
	case 13:
	case 14:
	case 15:
	case 16:
	case 17:
	case 18: {
		auto idx = subcase - TILING13_3a_0;
		auto v12 = add_c_vertex(grid_coord);
		add_triangle(grid_coord, tiling13_3[config][idx], 10, int(v12));
	} break;

		// 13.4
	case 19:
	case 20:
	case 21:
	case 22: {
		auto idx = subcase - TILING13_4_0;
		auto v12 = add_c_vertex(grid_coord);
		add_triangle(grid_coord, tiling13_4[config][idx], 12, int(v12));
	} break;

		// 13.5
	case 23:
	case 24:
	case 25:
	case 26: {
		auto idx = subcase - TILING13_5_0;
		auto is_interior = test_interior(test13[config][6], config_case,
			config, idx, cube);
		if (is_interior) {
			add_triangle(grid_coord, tiling13_5_1[config][idx], 6);
		}
		else {
			add_triangle(grid_coord, tiling13_5_2[config][idx], 10);
		}
	} break;

		// 13.3b
	case 27:
	case 28:
	case 29:
	case 30:
	case 31:
	case 32:
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38: {
		auto idx = subcase - TILING13_3b_0;
		auto v12 = add_c_vertex(grid_coord);
		add_triangle(grid_coord, tiling13_3_[config][idx], 10, int(v12));
	} break;

		// 13.2b
	case 39:
	case 40:
	case 41:
	case 42:
	case 43:
	case 44: {
		auto idx = subcase - TILING13_2b_0;
		add_triangle(grid_coord, tiling13_2_[config][idx], 6);
	} break;

	default:
		std::cout << "Marching Cubes: Impossible case 13?\n";
		print_cube(cube);
	}
}

// Process a unit cube
void MarchingCubes::ProcessCube(const glm::ivec3 &grid_coord, uint8_t lut_entry,
	float *cube)
	//-----------------------------------------------------------------------------
{
	if (algorithm_ == OriginalMarchingCubes) {
		char nt = 0;
		while (casesClassic[lut_entry][3 * nt] != -1) nt++;
		add_triangle(grid_coord, casesClassic[lut_entry], nt);
		return;
	}

	int v12 = -1;
	// case of the active cube in [0..15]
	uint8_t config_case = cases[lut_entry][0];
	// configuration of the active cube
	uint8_t config = cases[lut_entry][1];
	// subconfiguration of the active cube
	uint8_t subconfig = 0;

	switch (config_case) {
	case 0:
		break;

	case 1:
		add_triangle(grid_coord, tiling1[config], 1);
		break;

	case 2:
		add_triangle(grid_coord, tiling2[config], 2);
		break;

	case 3:
		if (test_face(test3[config], cube))
			add_triangle(grid_coord, tiling3_2[config], 4);  // 3.2
		else
			add_triangle(grid_coord, tiling3_1[config], 2);  // 3.1
		break;

	case 4:
		if (test_interior(test4[config], config_case, config, subconfig,
			cube))
			add_triangle(grid_coord, tiling4_1[config], 2);  // 4.1.1
		else
			add_triangle(grid_coord, tiling4_2[config], 6);  // 4.1.2
		break;

	case 5:
		add_triangle(grid_coord, tiling5[config], 3);
		break;

	case 6:
		if (test_face(test6[config][0], cube))
			add_triangle(grid_coord, tiling6_2[config], 5);  // 6.2
		else {
			if (test_interior(test6[config][1], config_case, config,
				subconfig, cube))
				add_triangle(grid_coord, tiling6_1_1[config], 3);  // 6.1.1
			else {
				v12 = int(add_c_vertex(grid_coord));
				add_triangle(grid_coord, tiling6_1_2[config], 9,
					v12);  // 6.1.2
			}
		}
		break;

	case 7:
		for (int i = 0; i <= 2; ++i) {
			if (test_face(test7[config][i], cube)) {
				subconfig |= 1 << i;
			}
		}
		switch (subconfig) {
		case 0:
			add_triangle(grid_coord, tiling7_1[config], 3);
			break;
		case 1:
			add_triangle(grid_coord, tiling7_2[config][0], 5);
			break;
		case 2:
			add_triangle(grid_coord, tiling7_2[config][1], 5);
			break;
		case 3:
			v12 = int(add_c_vertex(grid_coord));
			add_triangle(grid_coord, tiling7_3[config][0], 9, v12);
			break;
		case 4:
			add_triangle(grid_coord, tiling7_2[config][2], 5);
			break;
		case 5:
			v12 = int(add_c_vertex(grid_coord));
			add_triangle(grid_coord, tiling7_3[config][1], 9, v12);
			break;
		case 6:
			v12 = int(add_c_vertex(grid_coord));
			add_triangle(grid_coord, tiling7_3[config][2], 9, v12);
			break;
		case 7:
			if (test_interior(test7[config][3], config_case, config,
				subconfig, cube))
				add_triangle(grid_coord, tiling7_4_2[config], 9);
			else
				add_triangle(grid_coord, tiling7_4_1[config], 5);
			break;
		};
		break;

	case 8:
		add_triangle(grid_coord, tiling8[config], 2);
		break;

	case 9:
		add_triangle(grid_coord, tiling9[config], 4);
		break;

	case 10:
		if (test_face(test10[config][0], cube)) {
			if (test_face(test10[config][1], cube))
				add_triangle(grid_coord, tiling10_1_1_[config],
					4);  // 10.1.1
			else {
				v12 = int(add_c_vertex(grid_coord));
				add_triangle(grid_coord, tiling10_2[config], 8,
					v12);  // 10.2
			}
		}
		else {
			if (test_face(test10[config][1], cube)) {
				v12 = int(add_c_vertex(grid_coord));
				add_triangle(grid_coord, tiling10_2_[config], 8,
					v12);  // 10.2
			}
			else {
				if (test_interior(test10[config][2], config_case, config,
					subconfig, cube))
					add_triangle(grid_coord, tiling10_1_1[config],
						4);  // 10.1.1
				else
					add_triangle(grid_coord, tiling10_1_2[config],
						8);  // 10.1.2
			}
		}
		break;

	case 11:
		add_triangle(grid_coord, tiling11[config], 4);
		break;

	case 12:
		if (test_face(test12[config][0], cube)) {
			if (test_face(test12[config][1], cube))
				add_triangle(grid_coord, tiling12_1_1_[config],
					4);  // 12.1.1
			else {
				v12 = int(add_c_vertex(grid_coord));
				add_triangle(grid_coord, tiling12_2[config], 8,
					v12);  // 12.2
			}
		}
		else {
			if (test_face(test12[config][1], cube)) {
				v12 = int(add_c_vertex(grid_coord));
				add_triangle(grid_coord, tiling12_2_[config], 8,
					v12);  // 12.2
			}
			else {
				if (test_interior(test12[config][2], config_case, config,
					subconfig, cube))
					add_triangle(grid_coord, tiling12_1_1[config],
						4);  // 12.1.1
				else
					add_triangle(grid_coord, tiling12_1_2[config],
						8);  // 12.1.2
			}
		}
		break;

	case 13:
		ProcessCubeTiling13(grid_coord, config_case, config, cube);
		break;

	case 14:
		add_triangle(grid_coord, tiling14[config], 4);
		break;
	};
}

static glm::ivec3 cube_offsets[12] = {
	glm::ivec3(0),       glm::ivec3(1, 0, 0), glm::ivec3(0, 1, 0),
	glm::ivec3(0),       glm::ivec3(0, 0, 1), glm::ivec3(1, 0, 1),
	glm::ivec3(0, 1, 1), glm::ivec3(0, 0, 1), glm::ivec3(0),
	glm::ivec3(1, 0, 0), glm::ivec3(1, 1, 0), glm::ivec3(0, 1, 0),
};

void MarchingCubes::add_triangle(const glm::ivec3 &grid_coord, const char *trig,
	char n, int v12)
{
	int i = 0;
	while (i < 3 * n) {
		glm::ivec3 tv;

		for (int t = 0; t < 3; ++t, ++i) {
			const auto &offset = cube_offsets[trig[i]];
			switch (trig[i]) {
			case 0:
			case 2:
			case 4:
			case 6:
				tv[t] = int(get_x_vert(grid_coord + offset));
				break;

			case 1:
			case 3:
			case 5:
			case 7:
				tv[t] = int(get_y_vert(grid_coord + offset));
				break;

			case 8:
			case 9:
			case 10:
			case 11:
				tv[t] = int(get_z_vert(grid_coord + offset));
				break;

			case 12:
				tv[t] = v12;
				break;
			default:
				break;
			}

			if (tv[t] == -1) {
				std::cout << "Marching Cubes: invalid triangle "
					<< (ntrigs() + 1) << "\n";
				// print_cube() ;
			}
		}

		triangles_.push_back(Triangle{ tv });
	}
}
//_____________________________________________________________________________

//_____________________________________________________________________________
// Calculating gradient
float MarchingCubes::get_grad(const glm::ivec3 &grid_coord, int dim)
{
	auto next_grid_coord = grid_coord;
	next_grid_coord[dim] += 1;

	auto prev_grid_coord = grid_coord;
	prev_grid_coord[dim] -= 1;

	if (grid_coord[dim] > 0) {
		if (grid_coord[dim] < size_[dim] - 1) {
			return (get_data(next_grid_coord) - get_data(prev_grid_coord)) / 2;
		}
		else {
			return get_data(grid_coord) - get_data(prev_grid_coord);
		}
	}
	else {
		return get_data(next_grid_coord) - get_data(grid_coord);
	}
}

//_____________________________________________________________________________
// Adding vertices

size_t MarchingCubes::add_vertex(const glm::ivec3 &grid_coord,
	const glm::ivec3 &dir, int corner, float *cube)
{
	auto u = cube[0] / (cube[0] - cube[corner]);
	auto pos = glm::vec3(grid_coord) + glm::vec3(dir) * u;

	auto grid_coord2 = grid_coord + dir;
	auto nx = (1 - u) * get_grad(grid_coord, 0) + u * get_grad(grid_coord2, 0);
	auto ny = (1 - u) * get_grad(grid_coord, 1) + u * get_grad(grid_coord2, 1);
	auto nz = (1 - u) * get_grad(grid_coord, 2) + u * get_grad(grid_coord2, 2);

	auto n = glm::normalize(glm::vec3(nx, ny, nz));
	vertices_.push_back(Vertex{ pos, n });
	return vertices_.size() - 1;
}

size_t MarchingCubes::add_c_vertex(const glm::ivec3 &grid_coord)
//-----------------------------------------------------------------------------
{
	auto u = float{ 0.f };
	auto pos = glm::vec3(0.f);
	auto n = glm::vec3(0.f);

	// Computes the average of the intersection points of the cube
	// x-face
	for (auto t : { 0, 1 }) {
		for (auto s : { 0, 1 }) {
			auto vid = get_x_vert(
				glm::ivec3(grid_coord.x, grid_coord.y + s, grid_coord.z + t));
			if (vid != -1) {
				++u;
				const Vertex &v = vertices_[vid];
				pos += v.pos;
				n += v.n;
			}
		}
	}

	// y-face
	for (auto t : { 0, 1 }) {
		for (auto s : { 0, 1 }) {
			auto vid = get_y_vert(
				glm::ivec3(grid_coord.x + t, grid_coord.y, grid_coord.z + s));
			if (vid != -1) {
				++u;
				const Vertex &v = vertices_[vid];
				pos += v.pos;
				n += v.n;
			}
		}
	}

	// z-face
	for (auto t : { 0, 1 }) {
		for (auto s : { 0, 1 }) {
			auto vid = get_z_vert(
				glm::ivec3(grid_coord.x + s, grid_coord.y + t, grid_coord.z));
			if (vid != -1) {
				++u;
				const Vertex &v = vertices_[vid];
				pos += v.pos;
				n += v.n;
			}
		}
	}

	pos *= 1.f / u;
	n = glm::normalize(n);
	vertices_.push_back(Vertex{ pos, n });
	return vertices_.size() - 1;
}
//_____________________________________________________________________________
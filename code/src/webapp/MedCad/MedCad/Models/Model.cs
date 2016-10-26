using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore.Extensions;
using System.ComponentModel.DataAnnotations;


public class ModelContext : DbContext
{
    public ModelContext(DbContextOptions<ModelContext> options)
    : base(options)
    { }

    public DbSet<Model> Employees { get; set; }
}

/// <summary>
/// Factory class for EmployeesContext
/// </summary>
public static class ModelContextFactory
{
    public static ModelContext Create(string connectionString)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ModelContext>();
        optionsBuilder.UseMySQL("server=localhost;userid=root;pwd=20101995;port=3305;database=sakila;sslmode=none;");

        //Ensure database creation
        var context = new ModelContext(optionsBuilder.Options);
        context.Database.EnsureCreated();

        return context;
    }
}

/// <summary>
/// A basic class for an Employee
/// </summary>
public class Model
{
    public Model()
    {
    }

    public int id { get; set; }

    public int userId { get; set; }

    public string data { get; set; }

    public string creationDate { get; set; }
}
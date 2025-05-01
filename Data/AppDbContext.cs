using Microsoft.EntityFrameworkCore;
using MercadoAPI.Models;

namespace MercadoAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>().HasData(
            new Categoria { Id = 1, Nome = "Frios" },
            new Categoria { Id = 2, Nome = "Hortifruti" },
            new Categoria { Id = 3, Nome = "Bebidas" },
            new Categoria { Id = 4, Nome = "Limpeza" }
        );
    }
}
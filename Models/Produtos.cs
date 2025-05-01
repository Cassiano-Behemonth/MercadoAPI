using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MercadoAPI.Models;

public class Produto
{
    public int Id { get; set; }

    [Required]
    public string? Nome { get; set; }

    [Required]
    public decimal Preco { get; set; }

    public DateTime DataCriacao { get; set; } = DateTime.Now;

    [ForeignKey("Categoria")]
    public int CategoriaId { get; set; }

    public Categoria? Categoria { get; set; }
}
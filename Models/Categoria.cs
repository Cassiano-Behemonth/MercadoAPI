using System.ComponentModel.DataAnnotations;

namespace MercadoAPI.Models;

public class Categoria
{
    public int Id { get; set; }

    [Required]
    public string? Nome { get; set; }

    public ICollection<Produto>? Produtos { get; set; }
}

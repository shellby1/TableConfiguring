namespace TableConfiguring.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public int SupplierId { get; set; }

        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Unit { get; set; }

        [Column(TypeName = "money")]
        public decimal Price { get; set; }
    }
}

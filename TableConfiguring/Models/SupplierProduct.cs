namespace TableConfiguring.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SupplierProduct
    {
        [Key]
        [StringLength(50)]
        public string Name { get; set; }

        public int? Beverages { get; set; }

        public int? Condiments { get; set; }

        public int? Confections { get; set; }

        [Column("Dairy Products")]
        public int? Dairy_Products { get; set; }

        [Column("Grains/Cereals")]
        public int? Grains_Cereals { get; set; }

        [Column("Meat/Poultry")]
        public int? Meat_Poultry { get; set; }

        public int? Produce { get; set; }

        public int? Seafood { get; set; }
    }
}

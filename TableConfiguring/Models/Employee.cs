namespace TableConfiguring.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Employee
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Column(TypeName = "date")]
        public DateTime BithDate { get; set; }

        [Required]
        [StringLength(30)]
        public string Photo { get; set; }

        [Required]
        [StringLength(600)]
        public string Notes { get; set; }
    }
}

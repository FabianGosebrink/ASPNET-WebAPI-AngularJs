﻿

using System.ComponentModel.DataAnnotations;

namespace MicrosoftTechDaysDemoApplicationNoSignalR.Server.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Age { get; set; }
    }
}
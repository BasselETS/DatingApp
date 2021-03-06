using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File {get;set;}
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string PulicId { get; set; }        

        public PhotoForCreationDto()
        {
            Created = DateTime.Now;
        }
    }

}
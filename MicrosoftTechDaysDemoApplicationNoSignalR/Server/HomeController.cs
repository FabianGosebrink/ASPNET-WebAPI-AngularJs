using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Models;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Services;

namespace MicrosoftTechDaysDemoApplicationNoSignalR.Server
{
    [RoutePrefix("api")]
    public class HomeController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(Singleton.Instance.Persons);
        }

        public IHttpActionResult Post([FromBody] Person person)
        {

            Person personToAdd = new Person
            {
                Id = new Random().Next(1, 1000),
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            return Ok(personToAdd);
        }

        [Route("home/{personId}")]
        public IHttpActionResult Delete(int personId)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == personId);

            Singleton.Instance.Persons.Remove(personToRemove);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
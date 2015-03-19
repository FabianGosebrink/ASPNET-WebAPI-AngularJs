using System;
using System.Linq;
using System.Web.Http;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Models;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Services;

namespace MicrosoftTechDaysDemoApplicationNoSignalR.Server
{
    public class HomeController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllMyPersons()
        {
            return Ok(Singleton.Instance.Persons);
        }

        [HttpPost]
        public IHttpActionResult AddPerson([FromBody] Person person)
        {
            Person personToAdd = new Person
            {
                Id = Guid.NewGuid(),
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            return Ok(personToAdd);
        }

        [HttpPost]
        public IHttpActionResult DeletePerson([FromBody] Person person)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == person.Id);

            Singleton.Instance.Persons.Remove(personToRemove);

            return Ok(person);
        }
    }
}
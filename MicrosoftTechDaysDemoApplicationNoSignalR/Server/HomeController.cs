﻿using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Models;
using MicrosoftTechDaysDemoApplicationNoSignalR.Server.Services;

namespace MicrosoftTechDaysDemoApplicationNoSignalR.Server
{
    [RoutePrefix("api/home")]
    public class HomeController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(Singleton.Instance.Persons);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetSingle(int id)
        {
            Person person = Singleton.Instance.Persons.FirstOrDefault(x => x.Id == id);

            if (person == null)
            {
                return NotFound();
            }


            return Ok(person);
        }

        [HttpPost]
        public IHttpActionResult AddPerson([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Person personToAdd = new Person
            {
                Id = new Random().Next(1, 1000),
                Age = person.Age,
                Name = person.Name
            };

            Singleton.Instance.Persons.Add(personToAdd);

            return Ok(personToAdd);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeletePerson(int id)
        {
            Person personToRemove = Singleton.Instance.Persons.First(x => x.Id == id);

            if (personToRemove == null)
            {
                return NotFound();
            }


            Singleton.Instance.Persons.Remove(personToRemove);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
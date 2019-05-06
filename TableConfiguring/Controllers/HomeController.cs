using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TableConfiguring.Controllers
{
    using Models;
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult TableTest()
        {
            List<Customer> customers = null;
            using (DataContext dbContext = new DataContext())
            {
                customers = dbContext.Customers.ToList();
            }
            return View(customers);
        }

        public ActionResult TableTestDetails(int id)
        {
            Customer customer;
            using(DataContext dbContext = new DataContext())
            {
                customer =
                    dbContext
                    .Customers
                    .FirstOrDefault(c => c.Id == id);
            }
            if(customer != null)
                return PartialView(customer);
            return HttpNotFound();
        }
    }
}
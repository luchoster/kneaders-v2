/* ============================================================
   KNEADERS — CONTENT DATA
   Specific, brand-true placeholder content.
   Real food photography from Unsplash for grid thumbs.
   ============================================================ */

window.HL_DATA = {
  // ---- Brand palette (kdrs Simple Style Guide) — single source of truth ----
  // Change a hex here and every v2 page updates.
  palette: {
    black:"#231F20",  /* PMS Black C  — primary */
    tan:"#EFE1C5",    /* PMS 7501C 50% — primary */
    tanDeep:"#D9C79E",/* PMS 7501C */
    cream:"#FDFBF7",  /* page ground ("on light/white") */
    gold:"#C7812A",   /* PMS 138C */
    goldDeep:"#AB6D26",/* PMS 139C */
    rust:"#A4541C",   /* PMS 160C */
    brown:"#803B24",  /* PMS 1685C */
    red:"#801B21",    /* PMS 491C */
    maroon:"#56252A", /* PMS 490C */
    sage:"#74813B",   /* PMS 7496C */
    sageLight:"#AFBD90", /* PMS 7493C */
    blue:"#4B8496",   /* PMS 7459C */
    blueLight:"#B7CBDA", /* PMS 643C */
    gray:"#B8BBBD",   /* PMS Cool Gray 4 */
  },

  // ---- Product color-coding (style guide, font-treatment page) ----
  // Values are palette keys. Edit here to re-map a category.
  categoryColors: {
    sandwiches:"gold", breakfast:"gold",          /* sandwiches + breakfast = 138C */
    salads:"sage", soups:"sage",                  /* salads + soups & sides = 7496C */
    breads:"red", pastries:"red",                 /* breads & pastries = 491C */
    beverages:"blue", smoothies:"blue", coffee:"blue", /* beverages & smoothies = 7459C */
    kids:"rust", catering:"brown",                /* combos & kids = 160C */
  },

  brand: {
    name: "Kneaders",
    tagline: "Bakery & Café",
    est: "1997",
    locations: 47,
    statesServed: 9,
  },

  // ---- Executive bios (Our Story page — swap photos/copy here) ----
  execs: [
    { name:"Gary & Colleen Worthington", role:"Founders", photo:null,
      bio:"Retired Subway franchisees who found retirement 'incredibly boring,' Gary and Colleen trained at the San Francisco Baking Institute, developed an exclusive flour blend with Lehi Roller Mills, and opened the first Kneaders in Orem in fall 1997 — baking European hearth bread from flour, water, and salt." },
    { name:"James Worthington", role:"Chief Executive Officer", photo:null,
      bio:"Son of the founders, James grew up in the kitchen, became the company's first franchisee in Midvale, and moved to the corporate office in 2007. He has led Kneaders' growth while keeping the mom-and-pop feeling of café number one." },
    { name:"Dave Vincent", role:"President & CFO", photo:null,
      bio:"Dave started part-time making sandwiches and washing dishes, joined full-time in 2000, and has refined the systems behind the company's growth across the western United States ever since." },
  ],

  // ---- Giving back (Giving page pillars) ----
  giving: [
    { h:"Alleviating hunger", p:"Day-end bread goes to local food banks and shelters — every café, every night." },
    { h:"Supporting schools", p:"Classroom fundraisers, teacher appreciation trays, and reading-program rewards." },
    { h:"Children's hospitals", p:"Every September, the whole company joins our guests and the Huntsman Cancer Institute to fight childhood cancer." },
  ],

  // ---- Menu categories (Menu page) ----
  categories: [
    { slug: "breakfast", label: "Breakfast",        count: 18, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80", desc: "From dawn croissants to skillet scrambles." },
    { slug: "breads",    label: "Artisan Breads",    count: 14, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80", desc: "Hearth-baked daily. Long-fermented. Honest." },
    { slug: "sandwiches",label: "Sandwiches",        count: 22, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80", desc: "Stacked on our breads, made to order." },
    { slug: "soups",     label: "Soups",             count: 11, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80", desc: "A rotating schedule. Always with bread." },
    { slug: "salads",    label: "Salads",            count:  9, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80", desc: "Crisp, seasonal, and dressed in-house." },
    { slug: "pastries",  label: "Pastries & Desserts", count: 26, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=80", desc: "Laminated, glazed, and cooled on the rack." },
    { slug: "coffee",    label: "Coffee & Espresso", count: 16, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80", desc: "Direct-trade beans, pulled by hand." },
    { slug: "smoothies", label: "Smoothies",         count:  8, image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=1000&q=80", desc: "Whole-fruit, never from concentrate." },
    { slug: "kids",      label: "Kids Meals",        count:  7, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80", desc: "Half portions. Whole smiles." },
    { slug: "beverages", label: "Beverages",         count: 12, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=80", desc: "Lemonades, teas, and the long pour." },
    { slug: "catering",  label: "Catering",          count: 24, image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80", desc: "Trays, boxes, and breakfast spreads." },
  ],

  // ---- Featured signature items (homepage + menu) ----
  signatures: [
    { name: "Country Sourdough Boule",  slug:"country-sourdough", price: 8.50,  cat:"breads",    tag:"Bakery", time:"36-hr ferment", image:"https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80" },
    { name: "Almond Pull-Apart",        slug:"almond-pull-apart",price: 6.25,  cat:"pastries",  tag:"Daily",  time:"Until 2pm",     image:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=80" },
    { name: "Tomato Basil Bisque",      slug:"tomato-basil",     price: 7.95,  cat:"soups",     tag:"Tuesdays + Fridays", time:"With focaccia", image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80" },
    { name: "The Kneaders Turkey",      slug:"turkey-bacon",     price:13.50,  cat:"sandwiches",tag:"Bestseller", time:"On harvest grain", image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80" },
    { name: "Chocolate Croissant",      slug:"chocolate-croissant",price: 4.50,tag:"Pastry",    cat:"pastries", time:"72-hr lamination", image:"https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=80" },
    { name: "Honey Lavender Latte",     slug:"honey-lavender",   price: 5.75,  cat:"coffee",    tag:"Spring",  time:"Through May",   image:"https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=1200&q=80" },
  ],

  // ---- Detailed items per category — for menu page expand panels ----
  itemsByCategory: {
    breakfast: [
      { name:"Cinnamon French Toast",    price:11.95, kcal:640, desc:"Thick-cut Texas toast soaked in vanilla custard, griddled, dusted with cinnamon sugar, served with warm maple syrup.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80", pairs:["Honey Lavender Latte","Fresh OJ"] },
      { name:"Hearth Skillet",           price:12.95, kcal:780, desc:"Yukon potatoes, three-cheese scramble, applewood bacon, charred tomato, sourdough toast.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80", pairs:["Drip Coffee","Berry Smoothie"] },
      { name:"Almond Pull-Apart",        price: 6.25, kcal:520, desc:"Brioche pulled-apart with almond cream, baked golden, finished with sliced almonds and pearl sugar.", allergens:["egg","gluten","dairy","tree nut"], image:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=80", pairs:["Cortado","Earl Grey"] },
      { name:"Sausage Egg Croissant",    price: 8.95, kcal:610, desc:"House croissant, breakfast sausage, two-egg scramble, sharp cheddar, peppery aioli.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=80", pairs:["Cold Brew"] },
      { name:"Berry Yogurt Bowl",        price: 7.50, kcal:340, desc:"Whole-milk yogurt, in-season berries, toasted oat granola, wildflower honey.", allergens:["dairy","oat"], image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80", pairs:["Green Smoothie"] },
      { name:"Avocado Sourdough",        price: 9.95, kcal:430, desc:"Country sourdough, smashed avocado, soft-boiled egg, espelette, lemon, herbs.", allergens:["egg","gluten"], image:"https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=1200&q=80", pairs:["Flat White"] },
    ],
    breads: [
      { name:"Country Sourdough Boule",  price: 8.50, kcal:120, desc:"Open crumb, blistered crust, 36-hour cold ferment with our 14-year-old levain.", allergens:["gluten"], image:"https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80", pairs:["Salted Butter","Olive Oil + Sea Salt"] },
      { name:"Seeded Rye",               price: 8.95, kcal:140, desc:"Caraway, fennel, and toasted sunflower seeds in a dense crumb.", allergens:["gluten","seed"], image:"https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1200&q=80", pairs:["Sharp Cheddar"] },
      { name:"Honey Wheat",              price: 7.50, kcal:135, desc:"Soft sandwich loaf, sweetened lightly with clover honey.", allergens:["gluten"], image:"https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1200&q=80", pairs:["Turkey + Avocado"] },
      { name:"Olive & Rosemary Focaccia",price: 9.50, kcal:180, desc:"High-hydration focaccia, Castelvetrano olives, fresh rosemary, finishing oil.", allergens:["gluten"], image:"https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=1200&q=80", pairs:["Tomato Bisque"] },
      { name:"Harvest Grain",            price: 8.25, kcal:150, desc:"Five-grain blend, oats on top, slow-fermented for a deep, nutty flavor.", allergens:["gluten","oat"], image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80", pairs:["Egg Salad"] },
      { name:"Brioche Loaf",             price: 9.95, kcal:160, desc:"Buttery, rich, pillowy. Sliced for French toast or torn for the table.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1200&q=80", pairs:["Strawberry Jam"] },
    ],
    sandwiches: [
      { name:"The Kneaders Turkey",    price:13.50, kcal:720, desc:"Roasted turkey, applewood bacon, avocado, tomato, butter lettuce, cranberry aioli on harvest grain.", allergens:["gluten","egg"], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80", pairs:["Tomato Basil Bisque"] },
      { name:"Roast Beef + Cheddar",     price:13.95, kcal:740, desc:"Slow-roasted beef, sharp cheddar, caramelized onion, horseradish cream on seeded rye.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80", pairs:["Potato Leek Soup"] },
      { name:"Caprese Pesto",            price:12.50, kcal:620, desc:"Heirloom tomato, fresh mozzarella, basil pesto, balsamic glaze on focaccia.", allergens:["gluten","dairy","tree nut"], image:"https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?auto=format&fit=crop&w=1200&q=80", pairs:["Spring Salad"] },
      { name:"Chicken Salad Croissant",  price:11.95, kcal:580, desc:"Roast chicken, celery, grapes, toasted almonds, herb mayo on a flaky croissant.", allergens:["egg","gluten","dairy","tree nut"], image:"https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=1200&q=80", pairs:["Iced Tea"] },
      { name:"Grilled Cheese, Three Ways",price:10.95, kcal:680, desc:"Sharp cheddar, gruyère, fontina on country sourdough, griddled in salted butter.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1200&q=80", pairs:["Tomato Basil Bisque"] },
      { name:"Garden Veg",               price:11.50, kcal:540, desc:"Roasted peppers, cucumber, sprouts, hummus, herb-whipped feta on multigrain.", allergens:["gluten","dairy","sesame"], image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1200&q=80", pairs:["Lemon Quinoa Salad"] },
    ],
    soups: [
      { name:"Tomato Basil Bisque",      price: 7.95, kcal:310, desc:"Slow-roasted tomatoes, fresh basil, a touch of cream. Served with our focaccia.", allergens:["dairy","gluten"], image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80", pairs:["Grilled Cheese"] },
      { name:"Potato Leek",              price: 7.50, kcal:340, desc:"Yukon potatoes, leeks, thyme, finished with crème fraîche.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=1200&q=80", pairs:["Country Sourdough"] },
      { name:"White Bean + Kale",        price: 7.95, kcal:280, desc:"Cannellini beans, lacinato kale, garlic, parmesan rind, lemon.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=1200&q=80", pairs:["Seeded Rye"] },
      { name:"Chicken Wild Rice",        price: 8.25, kcal:380, desc:"Pulled chicken, wild rice, root vegetables, sage cream.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80", pairs:["Honey Wheat"] },
      { name:"Roasted Cauliflower",      price: 7.50, kcal:240, desc:"Charred cauliflower, brown butter, toasted almonds, parsley oil.", allergens:["dairy","tree nut"], image:"https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=1200&q=80", pairs:["Garden Veg Sandwich"] },
    ],
    salads: [
      { name:"Spring Garden",            price:11.50, kcal:340, desc:"Butter lettuce, snap peas, radish, soft herbs, lemon vinaigrette.", allergens:[], image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80", pairs:["Country Sourdough"] },
      { name:"Harvest Grain Bowl",       price:13.50, kcal:520, desc:"Farro, roasted squash, kale, dried cranberry, pumpkin seeds, maple-tahini.", allergens:["gluten","seed"], image:"https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80", pairs:["Seeded Rye"] },
      { name:"Caesar, Properly",         price:11.95, kcal:480, desc:"Whole leaves of romaine, parmesan, anchovy croutons, classic dressing.", allergens:["egg","fish","dairy","gluten"], image:"https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1200&q=80", pairs:["Roasted Chicken"] },
      { name:"Cobb",                     price:13.95, kcal:640, desc:"Romaine, blue cheese, bacon, soft egg, avocado, tomato, red wine vinaigrette.", allergens:["egg","dairy"], image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80", pairs:["Brioche Toast"] },
    ],
    pastries: [
      { name:"Chocolate Croissant",      price: 4.50, kcal:380, desc:"Three-day lamination, dark chocolate batons, brushed with butter and finished raw.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=80", pairs:["Cortado"] },
      { name:"Lemon Tart",               price: 5.50, kcal:340, desc:"Sablé crust, Meyer lemon curd, torched meringue.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=80", pairs:["Earl Grey"] },
      { name:"Cardamom Knot",            price: 4.95, kcal:320, desc:"Brioche knot, brown butter and cardamom sugar, pearl sugar finish.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80", pairs:["Drip Coffee"] },
      { name:"Pistachio Financier",      price: 4.25, kcal:280, desc:"Brown butter, pistachio flour, almond, lightly bitter, deeply nutty.", allergens:["egg","dairy","tree nut"], image:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=80", pairs:["Espresso"] },
      { name:"Berry Galette",            price: 5.95, kcal:420, desc:"Free-form pie crust, in-season berries, vanilla sugar, demerara crunch.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80", pairs:["Vanilla Bean Latte"] },
      { name:"Brown Butter Cookie",      price: 3.50, kcal:240, desc:"Toasted milk solids, sea salt, dark brown sugar — chewy in the middle.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80", pairs:["Whole Milk"] },
    ],
    coffee: [
      { name:"Drip Coffee",              price: 3.25, kcal: 5,  desc:"Single-origin daily rotation, brewed on a precision batch machine.", allergens:[], image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80", pairs:["Brown Butter Cookie"] },
      { name:"Cortado",                  price: 4.25, kcal: 60, desc:"Equal parts espresso and steamed whole milk, served in glass.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=1200&q=80", pairs:["Almond Pull-Apart"] },
      { name:"Honey Lavender Latte",     price: 5.75, kcal:180, desc:"Double espresso, steamed milk, house lavender-honey syrup, dried bud.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=1200&q=80", pairs:["Pistachio Financier"] },
      { name:"Cold Brew",                price: 4.50, kcal: 5,  desc:"18-hour steeped, served over a single large rock.", allergens:[], image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80", pairs:["Cardamom Knot"] },
      { name:"Maple Oat Latte",          price: 5.50, kcal:160, desc:"Espresso, steamed oat milk, Vermont maple, finishing salt.", allergens:["oat"], image:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80", pairs:["Brown Butter Cookie"] },
      { name:"Espresso",                 price: 3.50, kcal: 5,  desc:"Two pulls, ristretto-leaning, served with a sparkling water.", allergens:[], image:"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1200&q=80", pairs:["Lemon Tart"] },
    ],
    smoothies: [
      { name:"Strawberry Banana",        price: 6.50, kcal:280, desc:"Whole strawberries, banana, vanilla yogurt, a touch of honey.", allergens:["dairy"], image:"https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=1200&q=80", pairs:["Avocado Sourdough"] },
      { name:"Green Garden",             price: 6.95, kcal:240, desc:"Spinach, banana, mango, ginger, lemon, coconut water.", allergens:[], image:"https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80", pairs:["Berry Yogurt Bowl"] },
      { name:"Wildberry",                price: 6.50, kcal:300, desc:"Blueberry, blackberry, raspberry, apple juice, vanilla.", allergens:[], image:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80", pairs:["Brioche Toast"] },
    ],
    kids: [
      { name:"Half PB&J",                price: 5.95, kcal:340, desc:"House grape jelly + crunchy peanut butter on honey wheat. Apple slices on the side.", allergens:["peanut","gluten"], image:"https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1200&q=80", pairs:["Whole Milk"] },
      { name:"Mini Mac + Cheese",        price: 6.50, kcal:420, desc:"Cavatappi, three-cheese, toasted breadcrumb top.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80", pairs:["Apple Juice"] },
      { name:"Kids Grilled Cheese",      price: 5.50, kcal:380, desc:"American + cheddar on country sourdough, cut into four.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1200&q=80", pairs:["Tomato Bisque"] },
    ],
    beverages: [
      { name:"Lavender Lemonade",        price: 4.25, kcal:140, desc:"Pressed lemon, lavender simple, soda or still.", allergens:[], image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=80", pairs:["Lemon Tart"] },
      { name:"Sparkling Hibiscus",       price: 4.50, kcal:110, desc:"Hibiscus tea, lime, agave, soda. Pink and not-too-sweet.", allergens:[], image:"https://images.unsplash.com/photo-1558640476-437a2b9438a2?auto=format&fit=crop&w=1200&q=80", pairs:["Caprese Pesto"] },
      { name:"Iced Earl Grey",           price: 3.95, kcal: 5,  desc:"Brewed strong, poured over ice, optional vanilla cream.", allergens:[], image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80", pairs:["Brown Butter Cookie"] },
    ],
    catering: [
      { name:"Breakfast Box (10)",       price: 92.00, kcal: null, desc:"Croissants, pull-aparts, scones, fruit, butter, preserves. Serves 10.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80", pairs:["Drip Coffee Tote"] },
      { name:"Sandwich Tray (12)",       price:128.00, kcal: null, desc:"A curated mix of our top sandwiches, halved and arranged.", allergens:["egg","gluten","dairy"], image:"https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=1200&q=80", pairs:["Garden Salad Bowl"] },
      { name:"Soup + Bread (serves 8)",  price: 86.00, kcal: null, desc:"One gallon of soup, two boules, salted butter.", allergens:["gluten","dairy"], image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80", pairs:["Berry Galette"] },
    ],
  },

  // ---- Soup schedule ----
  soupSchedule: [
    { day:"Monday",    soups:["Tomato Basil","Chicken Wild Rice","Roasted Cauliflower"] },
    { day:"Tuesday",   soups:["Tomato Basil","Potato Leek","White Bean + Kale"] },
    { day:"Wednesday", soups:["Chicken Wild Rice","Beef Barley","Carrot Ginger"] },
    { day:"Thursday",  soups:["Tomato Basil","Loaded Potato","Minestrone"] },
    { day:"Friday",    soups:["Tomato Basil","Clam Chowder","Roasted Cauliflower"] },
    { day:"Saturday",  soups:["Chef’s Choice","Tomato Basil","Chicken Tortilla"] },
    { day:"Sunday",    soups:["Country French Onion","Tomato Basil","Butternut Squash"] },
  ],

  // ---- Shop / Gifts ----
  shopCollections: [
    { id:"baskets",  label:"Gift Baskets",      desc:"Curated, ribboned, ready to send.",   image:"https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=1200&q=80" },
    { id:"pastry",   label:"Pastry Boxes",      desc:"A flight of laminated and glazed.",   image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80" },
    { id:"bread",    label:"Bread Club",        desc:"A boule a fortnight, by mail.",       image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80" },
    { id:"coffee",   label:"Coffee + Pantry",   desc:"Beans, jams, finishing salts.",       image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" },
    { id:"cards",    label:"Gift Cards",        desc:"Digital or hand-stamped.",            image:"https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1200&q=80" },
    { id:"apparel",  label:"Apparel + Aprons",  desc:"Made for the bench. And the porch.", image:"https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=1200&q=80" },
  ],

  shopProducts: [
    { id:"p1", name:"The Sunday Basket",       price: 88, ships:"Ships free",   tag:"Bestseller", desc:"Two boules, two pastries, jam, butter, coffee, hand-stamped card.", image:"https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=1200&q=80" },
    { id:"p2", name:"Pastry Flight (12)",      price: 64, ships:"Overnight",     tag:"Limited",    desc:"Croissants, knots, financiers, cookies — a baker's pick.", image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80" },
    { id:"p3", name:"Bread Club — 6 Months",   price: 168, ships:"Twice monthly", tag:"Subscription",desc:"A boule + a small treat, every other Friday. Pause anytime.", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80" },
    { id:"p4", name:"Kneaders Coffee, 12oz", price: 22, ships:"Whole or ground",tag:"Direct trade",desc:"Daily-house blend, roasted weekly in Salt Lake City.", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" },
    { id:"p5", name:"Linen Apron, Natural",    price: 58, ships:"Embroidered",    tag:"New",        desc:"Heavy-weight European linen, cross-back straps, two pockets.", image:"https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=1200&q=80" },
    { id:"p6", name:"Cherry Preserves, 8oz",   price: 14, ships:"Small batch",    tag:"Pantry",     desc:"Door County tart cherries, vanilla bean, lemon — slow-cooked in copper.", image:"https://images.unsplash.com/photo-1620483667489-a4ec51c2cba2?auto=format&fit=crop&w=1200&q=80" },
    { id:"p7", name:"Gift Card, Hand-stamped", price: 50, ships:"Mailed in 1 day",tag:"Any amount", desc:"Letterpress card with a wax-sealed envelope. $25–$500.", image:"https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1200&q=80" },
    { id:"p8", name:"Sourdough Starter Kit",   price: 36, ships:"Ships cool",     tag:"DIY",        desc:"50g of our 14-yr-old levain, banneton, lame, instructions.", image:"https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80" },
  ],

  // ---- Catering / Events ----
  cateringPackages: [
    { tier:"Morning",   range:"$8–14 / guest", min:"10 guest minimum", title:"Daybreak Spread",   includes:["Pastry assortment","Coffee tote (96oz)","Whole fruit","Butter + preserves"], image:"https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80" },
    { tier:"Midday",    range:"$13–18 / guest",min:"15 guest minimum", title:"Lunch Table",       includes:["Sandwich tray","Two soups OR salad","Bread basket","Cookies + brownies"], image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80" },
    { tier:"Gathering", range:"$22–32 / guest",min:"25 guest minimum", title:"Hearth Table",      includes:["Carving station","Two seasonal sides","Salad + bread","Dessert flight"], image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
    { tier:"Bespoke",   range:"By estimate",  min:"50+ guests",        title:"Designed For You",   includes:["Menu consultation","On-site set-up","Linen + service","Florals (optional)"], image:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80" },
  ],

  cateringUseCases: [
    { id:"office",  label:"Office",       lede:"Mornings that don't feel like meetings." },
    { id:"meeting", label:"Meetings",     lede:"Boxed lunches that finish before the slides." },
    { id:"shower", label:"Showers",        lede:"For the people who'd rather bake than register." },
    { id:"funeral",label:"In Sympathy",    lede:"Quiet, kind, delivered without questions." },
    { id:"holiday",label:"Holidays",       lede:"Hot tables, cold platters, warm welcomes." },
    { id:"wedding",label:"Weddings",       lede:"Brunch the day after. Bread on the table." },
  ],

  // ---- Story values ----
  values: [
    { num:"01", h:"Long ferments",   p:"Our doughs sit cold for 36 hours, sometimes longer. Time is the first ingredient." },
    { num:"02", h:"Honest sourcing", p:"Direct-trade coffee, Utah dairy, Idaho wheat, named farms — printed on the menu." },
    { num:"03", h:"Hand-shaped",     p:"Every boule, knot, and roll is shaped by a human, not a divider." },
    { num:"04", h:"Hot at dawn",     p:"Bread comes out of the deck oven at 5:42 AM. The doors open at 6." },
  ],

  // ---- Editorial / Journal posts ----
  journal: [
    { slug:"hand-shape-boule", tag:"Story",   read:"7 min", date:"April 3, 2026", author:"Inés Marchetti, Head Baker", title:"Why we still hand-shape every boule",   excerpt:"Speed and softness are not the same thing. A note from our head baker on the math of patience.", image:"https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1600&q=80" },
    { slug:"spring-panzanella", tag:"Recipe",  read:"4 min", date:"March 28, 2026", author:"Theo Park, Chef de Cuisine", title:"Spring panzanella, six ways",            excerpt:"Day-old country sourdough, asparagus, soft-boiled eggs, and a vinaigrette to remember.",       image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80" },
    { slug:"heritage-mill", tag:"Field",   read:"6 min", date:"March 15, 2026", author:"Jules Whitfield", title:"A morning at Heritage Mill",             excerpt:"Where our wheat comes from, who grows it, and how it ends up in the loaf you ate Tuesday.", image:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80" },
    { slug:"revive-baguette", tag:"How-to",  read:"3 min", date:"March 5, 2026", author:"Inés Marchetti", title:"The right way to revive a baguette",     excerpt:"Forget the toaster. Run it under water, and into the oven. Trust us.",                          image:"https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1600&q=80" },
    { slug:"levain-mason-jar", tag:"Story", read:"5 min", date:"February 20, 2026", author:"Inés Marchetti", title:"On keeping a 14-year-old levain alive", excerpt:"It started in a Mason jar in a Sugar House basement. It hasn't stopped working a day since.", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80" },
    { slug:"butter-letters", tag:"Field", read:"8 min", date:"February 8, 2026", author:"Theo Park", title:"Letters from the butter rotation", excerpt:"Why we test six butters every spring, and why this year's pick was the most unlikely one.", image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80" },
  ],

  // ---- Events ----
  events: [
    { slug:"sourdough-101", series:"Workshop", title:"Sourdough 101: build a boule",
      date:"Saturday, May 9, 2026", time:"9:00 AM – 12:00 PM", price:"$95",
      seats:"12 seats", remaining:8, location:"Sugar House Bench, Salt Lake City",
      lede:"Three hours, one starter to take home, one boule you'll be proud of by lunch.",
      tag:"Hands-on",
      image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80" },
    { slug:"spring-supper", series:"Supper Club", title:"Long-table Spring Supper",
      date:"Friday, May 16, 2026", time:"6:30 PM – 9:30 PM", price:"$78",
      seats:"40 seats", remaining:11, location:"Old Town Patio, Park City",
      lede:"Five courses on the patio. Bread on the board. Wine on the rocks if you ask.",
      tag:"Dinner",
      image:"https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80" },
    { slug:"farmers-breakfast", series:"Open House", title:"Farmers' Breakfast at Heritage Mill",
      date:"Saturday, May 24, 2026", time:"8:00 AM – 11:00 AM", price:"Free, RSVP",
      seats:"100 seats", remaining:42, location:"Heritage Mill, Logan, UT",
      lede:"Meet the wheat. Tour the mill. Eat the loaf made from this morning's grind.",
      tag:"Field trip",
      image:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1600&q=80" },
    { slug:"croissant-class", series:"Workshop", title:"The 72-hour croissant",
      date:"Sunday, June 1, 2026", time:"9:00 AM – 1:00 PM", price:"$140",
      seats:"8 seats", remaining:3, location:"Sugar House Bench, Salt Lake City",
      lede:"A two-day class, taught in one. Lamination, butter math, and a dozen to take home.",
      tag:"Hands-on",
      image:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1600&q=80" },
    { slug:"fathers-day-brunch", series:"Holiday", title:"Father's Day Hot Plate Brunch",
      date:"Sunday, June 16, 2026", time:"9:00 AM – 1:00 PM", price:"$32 / adult",
      seats:"Walk-in", remaining:99, location:"All cafés",
      lede:"Hot tables, hash bar, the works. Grab a number and come hungry.",
      tag:"Family",
      image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1600&q=80" },
    { slug:"summer-bread-fair", series:"Festival", title:"Summer Bread Fair",
      date:"Saturday, July 12, 2026", time:"10:00 AM – 4:00 PM", price:"Free entry",
      seats:"Open", remaining:99, location:"Pioneer Park, Salt Lake City",
      lede:"Twenty bakers, one block. Tastings, kid station, live levain demos. Rain or shine.",
      tag:"Festival",
      image:"https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=1600&q=80" },
  ],

  // ---- Locations ----
  locations: [
    { city:"Salt Lake City, UT", area:"Sugar House",     hours:"6a–8p", note:"Original. Wood-fired oven on view." },
    { city:"Park City, UT",      area:"Old Town",        hours:"6a–8p", note:"Patio. Mountain coffee program." },
    { city:"Boise, ID",          area:"Downtown",        hours:"6a–7p", note:"Bigger pastry case, smaller line." },
    { city:"Denver, CO",         area:"Lower Highlands", hours:"6a–8p", note:"Bench-grade espresso bar." },
  ],

  // ---- Stores (full locator dataset — ZIPs, geo, hours, services) ----
  // Coordinates are normalized 0..1 across our stylized US field-map (W/E, N/S).
  // Service flags drive amenity chips. ZIPs power the finder.
  stores: [
    { id:"slc-sugarhouse", name:"Sugar House",      city:"Salt Lake City", state:"UT", stateCode:"UT",
      address:"2120 S 1100 E", zip:"84106", phone:"(801) 467-5550",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"7a–7p" },
      open24h:false, openToday:"6a–8p", isOpenNow:true, distanceMi:1.2,
      mapX:0.30, mapY:0.42, isFlagship:true, opened:1997,
      services:["Dine-in","Drive-thru","Catering","Wood-fired oven","Patio"],
      note:"Original location. Wood-fired oven on view from the bench.",
      soup:"Tomato Basil · Chicken Wild Rice", manager:"Inés Marchetti",
      image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" },

    { id:"slc-foothill", name:"Foothill",            city:"Salt Lake City", state:"UT", stateCode:"UT",
      address:"1414 Foothill Dr", zip:"84108", phone:"(801) 583-2229",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"7a–7p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:3.4,
      mapX:0.32, mapY:0.40, opened:2003,
      services:["Dine-in","Drive-thru","Catering"],
      note:"Quietest morning in the city. Strong study crowd after 2pm.",
      soup:"Potato Leek · Tomato Basil", manager:"Theo Park" },

    { id:"slc-downtown", name:"Downtown / City Creek", city:"Salt Lake City", state:"UT", stateCode:"UT",
      address:"50 S Main St, Suite 175", zip:"84101", phone:"(801) 363-2229",
      hours:{ mon:"7a–7p", tue:"7a–7p", wed:"7a–7p", thu:"7a–7p", fri:"7a–8p", sat:"8a–8p", sun:"Closed" },
      openToday:"7a–7p", isOpenNow:true, distanceMi:4.1,
      mapX:0.30, mapY:0.41, opened:2012,
      services:["Dine-in","Catering","Patio"],
      note:"Tucked into City Creek. Walk-in only — no drive-thru.",
      soup:"Tomato Basil · White Bean + Kale", manager:"Jules Whitfield" },

    { id:"park-city", name:"Park City — Old Town",   city:"Park City",     state:"UT", stateCode:"UT",
      address:"1241 Park Ave",       zip:"84060", phone:"(435) 649-1717",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"6a–9p", sun:"6a–8p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:32.0,
      mapX:0.34, mapY:0.43, opened:2008,
      services:["Dine-in","Patio","Catering","Mountain coffee program"],
      note:"South-facing patio. Best ski-day pastry case in the state.",
      soup:"Roasted Cauliflower · Tomato Basil", manager:"Mara Vinas" },

    { id:"provo-riverwoods", name:"Provo — Riverwoods", city:"Provo",      state:"UT", stateCode:"UT",
      address:"4801 N University Ave", zip:"84604", phone:"(801) 224-2363",
      hours:{ mon:"6a–9p", tue:"6a–9p", wed:"6a–9p", thu:"6a–9p", fri:"6a–10p", sat:"7a–10p", sun:"7a–8p" },
      openToday:"6a–9p", isOpenNow:true, distanceMi:46.0,
      mapX:0.31, mapY:0.46, opened:2005,
      services:["Dine-in","Drive-thru","Catering","Late hours"],
      note:"The late-night crowd. Open until 10pm on weekends.",
      soup:"Chicken Wild Rice · Tomato Basil", manager:"Ben Hsu" },

    { id:"orem-state", name:"Orem — State Street",   city:"Orem",          state:"UT", stateCode:"UT",
      address:"427 N State St",      zip:"84057", phone:"(801) 226-2229",
      hours:{ mon:"6a–9p", tue:"6a–9p", wed:"6a–9p", thu:"6a–9p", fri:"6a–10p", sat:"7a–10p", sun:"Closed" },
      openToday:"6a–9p", isOpenNow:true, distanceMi:42.0,
      mapX:0.31, mapY:0.45,
      services:["Drive-thru","Catering"], opened:2001,
      note:"The drive-thru that started it all. Order from the car at 6:01am.",
      soup:"Tomato Basil · Loaded Potato" },

    { id:"st-george", name:"St. George — Town Square", city:"St. George", state:"UT", stateCode:"UT",
      address:"435 S River Rd",       zip:"84790", phone:"(435) 627-1717",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"Closed" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:301,
      mapX:0.28, mapY:0.55, opened:2010,
      services:["Dine-in","Drive-thru","Patio","Catering"],
      note:"Desert light through the south windows. Iced lavender lemonade flies.",
      soup:"Tomato Basil · Chicken Tortilla" },

    { id:"boise-downtown", name:"Boise — Downtown",  city:"Boise",          state:"ID", stateCode:"ID",
      address:"815 W Idaho St",       zip:"83702", phone:"(208) 433-1234",
      hours:{ mon:"6a–7p", tue:"6a–7p", wed:"6a–7p", thu:"6a–7p", fri:"6a–8p", sat:"7a–8p", sun:"7a–6p" },
      openToday:"6a–7p", isOpenNow:true, distanceMi:340,
      mapX:0.21, mapY:0.36, opened:2014,
      services:["Dine-in","Catering","Patio"],
      note:"Bigger pastry case, smaller line. Light-rail adjacent.",
      soup:"White Bean + Kale · Tomato Basil" },

    { id:"meridian", name:"Meridian — The Village",  city:"Meridian",       state:"ID", stateCode:"ID",
      address:"3597 E Monarch Sky Ln", zip:"83646", phone:"(208) 887-1717",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"7a–7p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:352,
      mapX:0.20, mapY:0.36, opened:2016,
      services:["Dine-in","Drive-thru","Catering"],
      note:"The fastest drive-thru in the network. Don't ask — they keep it secret." },

    { id:"denver-lohi", name:"Denver — Lower Highlands", city:"Denver",     state:"CO", stateCode:"CO",
      address:"1737 Boulder St",      zip:"80211", phone:"(303) 477-2229",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–10p", sat:"7a–10p", sun:"7a–7p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:526,
      mapX:0.46, mapY:0.45, opened:2019,
      services:["Dine-in","Patio","Catering","Bench-grade espresso bar"],
      note:"Bench-grade espresso bar. Outdoor patio under the cottonwoods.",
      soup:"Roasted Cauliflower · Chicken Wild Rice" },

    { id:"boulder", name:"Boulder — Pearl Street",   city:"Boulder",        state:"CO", stateCode:"CO",
      address:"1136 Pearl St",        zip:"80302", phone:"(303) 449-1717",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"7a–7p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:556,
      mapX:0.46, mapY:0.43, opened:2022,
      services:["Dine-in","Patio","Catering"],
      note:"On the Pearl Street pedestrian mall. Mountain views from the patio." },

    { id:"phoenix-arcadia", name:"Phoenix — Arcadia", city:"Phoenix",       state:"AZ", stateCode:"AZ",
      address:"4326 E Indian School Rd", zip:"85018", phone:"(602) 952-2229",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"7a–7p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:646,
      mapX:0.28, mapY:0.62, opened:2018,
      services:["Dine-in","Drive-thru","Patio","Catering"],
      note:"Misters on the patio. Iced everything." },

    { id:"scottsdale", name:"Scottsdale — Old Town", city:"Scottsdale",     state:"AZ", stateCode:"AZ",
      address:"7014 E Camelback Rd",  zip:"85251", phone:"(480) 949-2229",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"7a–9p", sun:"Closed" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:649,
      mapX:0.28, mapY:0.62,
      services:["Dine-in","Drive-thru","Catering"], opened:2020,
      note:"Closed Sundays. Bigger Saturday morning crowd than the rest of the week." },

    { id:"vegas-summerlin", name:"Las Vegas — Summerlin", city:"Las Vegas", state:"NV", stateCode:"NV",
      address:"1980 Festival Plaza Dr", zip:"89135", phone:"(702) 240-2229",
      hours:{ mon:"6a–9p", tue:"6a–9p", wed:"6a–9p", thu:"6a–9p", fri:"6a–10p", sat:"6a–10p", sun:"7a–8p" },
      openToday:"6a–9p", isOpenNow:true, distanceMi:421,
      mapX:0.18, mapY:0.55, opened:2021,
      services:["Dine-in","Drive-thru","Patio","Catering","Late hours"],
      note:"Cool tile, slow ceiling fans, real coffee at 6:01am." },

    { id:"reno", name:"Reno — Midtown",              city:"Reno",          state:"NV", stateCode:"NV",
      address:"811 S Virginia St",    zip:"89502", phone:"(775) 322-1717",
      hours:{ mon:"6a–7p", tue:"6a–7p", wed:"6a–7p", thu:"6a–7p", fri:"6a–8p", sat:"7a–8p", sun:"7a–6p" },
      openToday:"6a–7p", isOpenNow:true, distanceMi:524,
      mapX:0.10, mapY:0.39, opened:2024,
      services:["Dine-in","Catering","Patio"],
      note:"Newest in the network. Bench-cut sourdough every Friday at 4." },

    { id:"flagstaff", name:"Flagstaff — Heritage Square", city:"Flagstaff", state:"AZ", stateCode:"AZ",
      address:"110 E Aspen Ave",     zip:"86001", phone:"(928) 779-2229",
      hours:{ mon:"6a–7p", tue:"6a–7p", wed:"6a–7p", thu:"6a–7p", fri:"6a–8p", sat:"7a–8p", sun:"7a–6p" },
      openToday:"6a–7p", isOpenNow:true, distanceMi:535,
      mapX:0.30, mapY:0.55, opened:2023,
      services:["Dine-in","Patio","Catering"],
      note:"Mountain town pace. Best winter window in the company." },

    { id:"cheyenne", name:"Cheyenne — Capitol",      city:"Cheyenne",      state:"WY", stateCode:"WY",
      address:"1518 Carey Ave",       zip:"82001", phone:"(307) 632-2229",
      hours:{ mon:"6a–7p", tue:"6a–7p", wed:"6a–7p", thu:"6a–7p", fri:"6a–8p", sat:"7a–8p", sun:"Closed" },
      openToday:"Closed today · opens 6a Mon", isOpenNow:false, distanceMi:443,
      mapX:0.43, mapY:0.40, opened:2017,
      services:["Dine-in","Drive-thru","Catering"],
      note:"Closed today. Hot cocoa rotation starts October 1." },

    { id:"jackson", name:"Jackson — Town Square",    city:"Jackson",       state:"WY", stateCode:"WY",
      address:"35 E Broadway Ave",    zip:"83001", phone:"(307) 733-2229",
      hours:{ mon:"6a–8p", tue:"6a–8p", wed:"6a–8p", thu:"6a–8p", fri:"6a–9p", sat:"6a–9p", sun:"6a–8p" },
      openToday:"6a–8p", isOpenNow:true, distanceMi:281,
      mapX:0.36, mapY:0.34, opened:2025, isNew:true,
      services:["Dine-in","Patio","Catering"],
      note:"Newest store. Right off the antler arches. Opens onto the square." },

    // -- "Coming soon" placeholder for state-with-no-store empty state proof
    { id:"portland-soon", name:"Portland — Pearl District", city:"Portland", state:"OR", stateCode:"OR",
      address:"Coming late 2026",     zip:"97209", phone:"—",
      hours:null, openToday:"Opens late 2026", isOpenNow:false, distanceMi:752,
      mapX:0.10, mapY:0.27, comingSoon:true,
      services:["Coming soon"],
      note:"Buildout underway. Sign up below to know when the doors open." },
  ],

  // States we serve, with counts (for the state directory)
  serviceStates: [
    { code:"UT", name:"Utah",      count:7,  flagship:"Sugar House" },
    { code:"ID", name:"Idaho",     count:2,  flagship:"Boise — Downtown" },
    { code:"CO", name:"Colorado",  count:2,  flagship:"Denver — Lower Highlands" },
    { code:"AZ", name:"Arizona",   count:3,  flagship:"Phoenix — Arcadia" },
    { code:"NV", name:"Nevada",    count:2,  flagship:"Las Vegas — Summerlin" },
    { code:"WY", name:"Wyoming",   count:2,  flagship:"Jackson — Town Square" },
    { code:"OR", name:"Oregon",    count:0,  flagship:"Portland — opens 2026", soon:true },
    { code:"WA", name:"Washington",count:0,  flagship:"On the bench",          soon:true },
    { code:"NM", name:"New Mexico",count:0,  flagship:"On the bench",          soon:true },
  ],
};

const data_subcategory = [
  // Vidange et entretien
  {
    name: "Vidange huile moteur",
    categoryid: "67d168da7324ac778ddfedfe",
    categoryname: "Vidange et entretien",
    estimatedtime: 30,
    estimatedprice: 50,
  },
  {
    name: "Remplacement filtre à air",
    categoryid: "67d168da7324ac778ddfedfe",
    categoryname: "Vidange et entretien",
    estimatedtime: 15,
    estimatedprice: 20,
  },
  {
    name: "Changement liquide de refroidissement",
    categoryid: "67d168da7324ac778ddfedfe",
    categoryname: "Vidange et entretien",
    estimatedtime: 40,
    estimatedprice: 60,
  },

  // Freinage
  {
    name: "Remplacement plaquettes de frein",
    categoryid: "67d168da7324ac778ddfedff",
    categoryname: "Freinage",
    estimatedtime: 45,
    estimatedprice: 80,
  },
  {
    name: "Changement disque de frein",
    categoryid: "67d168da7324ac778ddfedff",
    categoryname: "Freinage",
    estimatedtime: 60,
    estimatedprice: 150,
  },
  {
    name: "Purge du liquide de frein",
    categoryid: "67d168da7324ac778ddfedff",
    categoryname: "Freinage",
    estimatedtime: 30,
    estimatedprice: 40,
  },

  // Pneumatiques
  {
    name: "Remplacement pneu avant",
    categoryid: "67d168da7324ac778ddfee00",
    categoryname: "Pneumatiques",
    estimatedtime: 30,
    estimatedprice: 100,
  },
  {
    name: "Réparation crevaison",
    categoryid: "67d168da7324ac778ddfee00",
    categoryname: "Pneumatiques",
    estimatedtime: 20,
    estimatedprice: 30,
  },
  {
    name: "Équilibrage roues",
    categoryid: "67d168da7324ac778ddfee00",
    categoryname: "Pneumatiques",
    estimatedtime: 45,
    estimatedprice: 50,
  },

  // Moteur et injection
  {
    name: "Changement bougies d'allumage",
    categoryid: "67d168da7324ac778ddfee01",
    categoryname: "Moteur et injection",
    estimatedtime: 30,
    estimatedprice: 70,
  },
  {
    name: "Nettoyage injecteurs",
    categoryid: "67d168da7324ac778ddfee01",
    categoryname: "Moteur et injection",
    estimatedtime: 60,
    estimatedprice: 150,
  },
  {
    name: "Réparation courroie de distribution",
    categoryid: "67d168da7324ac778ddfee01",
    categoryname: "Moteur et injection",
    estimatedtime: 120,
    estimatedprice: 500,
  },

  // Électricité et batterie
  {
    name: "Changement batterie",
    categoryid: "67d168da7324ac778ddfee02",
    categoryname: "Électricité et batterie",
    estimatedtime: 30,
    estimatedprice: 120,
  },
  {
    name: "Réparation alternateur",
    categoryid: "67d168da7324ac778ddfee02",
    categoryname: "Électricité et batterie",
    estimatedtime: 90,
    estimatedprice: 200,
  },
  {
    name: "Contrôle système de charge",
    categoryid: "67d168da7324ac778ddfee02",
    categoryname: "Électricité et batterie",
    estimatedtime: 45,
    estimatedprice: 80,
  },

  // Climatisation et chauffage
  {
    name: "Recharge climatisation",
    categoryid: "67d168da7324ac778ddfee03",
    categoryname: "Climatisation et chauffage",
    estimatedtime: 45,
    estimatedprice: 100,
  },
  {
    name: "Changement filtre habitacle",
    categoryid: "67d168da7324ac778ddfee03",
    categoryname: "Climatisation et chauffage",
    estimatedtime: 20,
    estimatedprice: 30,
  },
  {
    name: "Réparation système de chauffage",
    categoryid: "67d168da7324ac778ddfee03",
    categoryname: "Climatisation et chauffage",
    estimatedtime: 60,
    estimatedprice: 150,
  },

  // Transmission et embrayage
  {
    name: "Changement embrayage",
    categoryid: "67d168da7324ac778ddfee04",
    categoryname: "Transmission et embrayage",
    estimatedtime: 180,
    estimatedprice: 600,
  },
  {
    name: "Réparation boîte de vitesses",
    categoryid: "67d168da7324ac778ddfee04",
    categoryname: "Transmission et embrayage",
    estimatedtime: 240,
    estimatedprice: 1000,
  },
  {
    name: "Révision système de transmission",
    categoryid: "67d168da7324ac778ddfee04",
    categoryname: "Transmission et embrayage",
    estimatedtime: 120,
    estimatedprice: 400,
  },

  // Carrosserie et peinture
  {
    name: "Réparation pare-chocs",
    categoryid: "67d168da7324ac778ddfee05",
    categoryname: "Carrosserie et peinture",
    estimatedtime: 60,
    estimatedprice: 200,
  },
  {
    name: "Peinture carrosserie",
    categoryid: "67d168da7324ac778ddfee05",
    categoryname: "Carrosserie et peinture",
    estimatedtime: 180,
    estimatedprice: 800,
  },
  {
    name: "Réparation porte",
    categoryid: "67d168da7324ac778ddfee05",
    categoryname: "Carrosserie et peinture",
    estimatedtime: 120,
    estimatedprice: 500,
  },

  // Échappement et pollution
  {
    name: "Changement silencieux",
    categoryid: "67d168da7324ac778ddfee06",
    categoryname: "Échappement et pollution",
    estimatedtime: 60,
    estimatedprice: 150,
  },
  {
    name: "Réparation catalyseur",
    categoryid: "67d168da7324ac778ddfee06",
    categoryname: "Échappement et pollution",
    estimatedtime: 90,
    estimatedprice: 250,
  },
  {
    name: "Vérification système antipollution",
    categoryid: "67d168da7324ac778ddfee06",
    categoryname: "Échappement et pollution",
    estimatedtime: 45,
    estimatedprice: 100,
  },

  // Direction et suspension
  {
    name: "Réparation direction assistée",
    categoryid: "67d168da7324ac778ddfee07",
    categoryname: "Direction et suspension",
    estimatedtime: 120,
    estimatedprice: 350,
  },
  {
    name: "Changement amortisseurs",
    categoryid: "67d168da7324ac778ddfee07",
    categoryname: "Direction et suspension",
    estimatedtime: 90,
    estimatedprice: 250,
  },
  {
    name: "Révision suspension",
    categoryid: "67d168da7324ac778ddfee07",
    categoryname: "Direction et suspension",
    estimatedtime: 60,
    estimatedprice: 200,
  },
];
module.exports = data_subcategory;

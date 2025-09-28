// Medical data from the English JSON file with Bengali translations
export const medicalData = {
  organs: [
    { id: 'skin', name: 'Skin (চামড়া)', nameBn: 'চামড়া', icon: '🩹' },
    { id: 'eye', name: 'Eye (চোখ)', nameBn: 'চোখ', icon: '👁️' },
    { id: 'gill', name: 'Gill (ফুলকা)', nameBn: 'ফুলকা', icon: '🫁' },
    { id: 'liver', name: 'Liver (যকৃত)', nameBn: 'যকৃত', icon: '🫀' },
    { id: 'intestine', name: 'Intestine (অন্ত্র)', nameBn: 'অন্ত্র', icon: '🔄' },
    { id: 'spleen', name: 'Spleen (প্লীহা)', nameBn: 'প্লীহা', icon: '❤️' },
    { id: 'kidney', name: 'Kidney (কিডনি)', nameBn: 'কিডনি', icon: '🫘' },
    { id: 'swim_bladder', name: 'Swim Bladder (সাঁতারের থলি)', nameBn: 'সাঁতারের থলি', icon: '💨' },
    { id: 'brain', name: 'Brain (মস্তিষ্ক)', nameBn: 'মস্তিষ্ক', icon: '🧠' },
    { id: 'muscle', name: 'Muscle (পেশী)', nameBn: 'পেশী', icon: '💪' }
  ],
  conditions: {
    skin: {
      healthy: [
        'Smooth, shiny, intact scales (মসৃণ, চকচকে, অক্ষত আঁশ)',
        'Normal color (স্বাভাবিক রঙ)',
        'No wounds (কোন ক্ষত নেই)'
      ],
      unhealthy: [
        'Ulcers/wounds (ক্ষত/আঘাত)',
        'Hemorrhages (রক্তক্ষরণ)',
        'Cotton-like growth (তুলার মতো বৃদ্ধি)',
        'White spots (সাদা দাগ)',
        'White spots like salt grains (লবণের দানার মতো সাদা দাগ)',
        'Blue-gray patches (নীল-ধূসর দাগ)',
        'Disc-like lice (ডিস্কের মতো উকুন)',
        'Thread-like worms attached (সুতা-সদৃশ কৃমি সংযুক্ত)',
        'Black pepper-like spots under skin (চামড়ার নিচে কালো গোলমরিচের মতো দাগ)',
        'Scale loss (আঁশ পড়ে যাওয়া)',
        'Injury (আঘাত)'
      ]
    },
    eye: {
      healthy: [
        'Clear, bright (পরিষ্কার, উজ্জ্বল)',
        'Normal size (স্বাভাবিক আকার)',
        'No swelling (কোন ফোলা নেই)'
      ],
      unhealthy: [
        'Cloudy (ঘোলা)',
        'Swollen (ফোলা)',
        'Sunken (ডেবে যাওয়া)',
        'Pop-eye (বেরিয়ে আসা চোখ)',
        'Blood around eyes (চোখের চারপাশে রক্ত)',
        'Opaque cornea (অস্বচ্ছ কর্নিয়া)',
        'Gas bubbles in eyes (চোখে গ্যাস বুদবুদ)'
      ]
    },
    gill: {
      healthy: [
        'Bright red (উজ্জ্বল লাল)',
        'Uniform filaments (সমান ফিলামেন্ট)',
        'Normal color (স্বাভাবিক রঙ)'
      ],
      unhealthy: [
        'Pale/white (anemia) (ফ্যাকাশে/সাদা (রক্তাল্পতা))',
        'Slimy (protozoa) (পিচ্ছিল (প্রোটোজোয়া))',
        'Erosion (BGD) (ক্ষয় (BGD))',
        'Hemorrhages (columnaris) (রক্তক্ষরণ (কলামনারিস))',
        'Brown necrosis (বাদামি নেক্রোসিস)',
        'Torn gills (ছিঁড়ে যাওয়া ফুলকা)',
        'Thread-like worms (সুতা-সদৃশ কৃমি)',
        'Gasping (হাঁপানো)',
        'Heavy mucus (ভারী শ্লেষ্মা)',
        'Costia sign (কোস্টিয়া চিহ্ন)',
        'Thick gills (মোটা ফুলকা)',
        'Reddish-brown layer (লালচে-বাদামি স্তর)'
      ]
    },
    liver: {
      healthy: [
        'Reddish-brown (লালচে-বাদামি)',
        'Smooth (মসৃণ)',
        'Normal size (স্বাভাবিক আকার)'
      ],
      unhealthy: [
        'Pale (ফ্যাকাশে)',
        'Fatty liver (চর্বিযুক্ত যকৃত)',
        'Swollen (ফোলা)',
        'Nodules (গাঁট)',
        'Hemorrhages (রক্তক্ষরণ)',
        'Yellow, oily (হলুদ, তৈলাক্ত)',
        'Enlarged gallbladder (বর্ধিত পিত্তথলি)',
        'Abscesses (ফোড়া)'
      ]
    },
    intestine: {
      healthy: [
        'Firm (শক্ত)',
        'Full of digested food (হজম হওয়া খাদ্যে পূর্ণ)',
        'Normal color (স্বাভাবিক রঙ)'
      ],
      unhealthy: [
        'Empty (খালি)',
        'White feces (সাদা মল)',
        'Swollen (ফোলা)',
        'Filled with mucus (শ্লেষ্মায় পূর্ণ)',
        'Red, gas (লাল, গ্যাস)',
        'Foul odor (দুর্গন্ধ)',
        'Thin walls (পাতলা দেওয়াল)',
        'White thread-like worms (সাদা সুতা-সদৃশ কৃমি)',
        'Pale intestines (ফ্যাকাশে অন্ত্র)'
      ]
    },
    spleen: {
      healthy: [
        'Small (ছোট)',
        'Reddish (লালচে)',
        'Normal size (স্বাভাবিক আকার)'
      ],
      unhealthy: [
        'Large and dark/black (বড় এবং গাঢ়/কালো)',
        'Swollen (ফোলা)',
        'Hemorrhages (রক্তক্ষরণ)',
        'Petechial (পেটেকিয়াল)',
        'Very large (খুব বড়)'
      ]
    },
    kidney: {
      healthy: [
        'Firm (শক্ত)',
        'Reddish (লালচে)',
        'Normal size (স্বাভাবিক আকার)'
      ],
      unhealthy: [
        'Swollen (ফোলা)',
        'Dark (গাঢ়)',
        'Hemorrhagic (রক্তক্ষরণযুক্ত)',
        'Petechial (পেটেকিয়াল)',
        'Abscesses (ফোড়া)'
      ]
    },
    swim_bladder: {
      healthy: [
        'Clear (পরিষ্কার)',
        'Normally inflated (স্বাভাবিকভাবে ফোলা)',
        'Correct size (সঠিক আকার)'
      ],
      unhealthy: [
        'Ruptured (ফেটে যাওয়া)',
        'Gas bubbles (গ্যাস বুদবুদ)',
        'Swims on one side (একদিকে সাঁতার)',
        'Cannot stay submerged (জলে ডুবতে পারে না)'
      ]
    },
    brain: {
      healthy: [
        'Normal (স্বাভাবিক)',
        'Not swollen (ফোলা নয়)',
        'Correct size (সঠিক আকার)'
      ],
      unhealthy: [
        'Inflammation (প্রদাহ)',
        'Hemorrhages (রক্তক্ষরণ)',
        'Spiral/spinning swimming (সর্পিল/ঘূর্ণায়মান সাঁতার)',
        'Neurological signs (স্নায়বিক লক্ষণ)',
        'Convulsions (খিঁচুনি)'
      ]
    },
    muscle: {
      healthy: [
        'Firm (শক্ত)',
        'White (সাদা)',
        'Normal texture (স্বাভাবিক বুনন)'
      ],
      unhealthy: [
        'Soft (নরম)',
        'Hemorrhagic spots (রক্তক্ষরণের দাগ)',
        'Cysts (সিস্ট)',
        'Cysts in organs/muscle (অঙ্গ/পেশীতে সিস্ট)',
        'Brittle fins (ভঙ্গুর পাখনা)',
        'Slow wound healing (ধীর ক্ষত নিরাময়)'
      ]
    }
  },
  diseases: [
    {
      id: 'do_crash',
      name: 'DO Crash/Hypoxia (ডিও ক্র্যাশ/হাইপোক্সিয়া)',
      symptoms: [
        'Pale gills (ফ্যাকাশে ফুলকা)',
        'Gasping at surface (পৃষ্ঠে হাঁপানো)',
        'Crowding at inlet (ইনলেটে ভিড়)',
        'Morning mortality (সকালে মৃত্যু)'
      ],
      treatment: 'Aerator, Water exchange, Agricultural Lime (Calcium Carbonate-CaCO3) (বায়ুচলাচল যন্ত্র, পানি বদল, কৃষি চুন (ক্যালসিয়াম কার্বনেট-CaCO3))',
      dosage: 'Aerator immediately; 20-30% water change; 1-2 kg lime/decimel (evening); DO >5 mg/L; reduce feeding for 24 hours (অবিলম্বে বায়ুচলাচল যন্ত্র; ২০-৩০% পানি বদল; ১-২ কেজি চুন/ডেসিমেল (সন্ধ্যায়); ডিও >৫ মিগ্রা/লিটার; ২৪ ঘন্টা খাদ্য কমানো)'
    },
    {
      id: 'ammonia_toxicity',
      name: 'Ammonia/Nitrite Toxicity (অ্যামোনিয়া/নাইট্রাইট বিষক্রিয়া)',
      symptoms: [
        'Brown gills after algal die-off (শৈবাল মরে যাওয়ার পর বাদামি ফুলকা)',
        'Foul odor (দুর্গন্ধ)',
        'Lethargy (অলসতা)'
      ],
      treatment: 'Zeolite, Salt - NaCl, Water exchange, Reduce feed (জিওলাইট, লবণ - NaCl, পানি বদল, খাদ্য কমানো)',
      dosage: 'Zeolite 2-3 kg/decimel; Salt 1-2 kg/decimel; 30-50% water change; stop/reduce feeding for 24-48 hours (জিওলাইট ২-৩ কেজি/ডেসিমেল; লবণ ১-২ কেজি/ডেসিমেল; ৩০-৫০% পানি বদল; ২৪-৪৮ ঘন্টা খাদ্য বন্ধ/কমানো)'
    },
    {
      id: 'trichodina',
      name: 'Trichodina spp. (ট্রাইকোডিনা স্পিসি)',
      symptoms: [
        'Excessive mucus (অতিরিক্ত শ্লেষ্মা)',
        'Rubbing (ঘষা)',
        'Disc-like appearance under microscope (মাইক্রোস্কোপে ডিস্কের মতো দেখা)'
      ],
      treatment: 'Salt dip, Potassium Permanganate-KMnO4, Formalin (if legal) (লবণ ডুবানো, পটাশিয়াম পারম্যাঙ্গানেট-KMnO4, ফরমালিন (যদি বৈধ))',
      dosage: 'Salt dip 2-3% for 5-10 minutes; KMnO4 2-3 g/decimel; Formalin 25 ppm for entire pond (২-৩% লবণ ডুবানো ৫-১০ মিনিট; KMnO4 ২-৩ গ্রাম/ডেসিমেল; পুরো পুকুরে ফরমালিন ২৫ পিপিএম)'
    },
    {
      id: 'dactylogyrus',
      name: 'Dactylogyrus/Gyrodactylus (Flukes) (ড্যাকটাইলোজাইরাস/জাইরোড্যাকটাইলাস (ফ্লুক))',
      symptoms: [
        'Torn gills (ছিঁড়ে যাওয়া ফুলকা)',
        'Thread-like worms (সুতা-সদৃশ কৃমি)',
        'Gasping (হাঁপানো)'
      ],
      treatment: 'Praziquantel, Salt, KMnO4 (প্রাজিকোয়ান্টেল, লবণ, KMnO4)',
      dosage: 'Praziquantel 2-5 mg/L bath or 10-20 mg/kg feed ×3-5 days; Salt 1-2 kg/decimel; KMnO4 2 g/decimel (প্রাজিকোয়ান্টেল ২-৫ মিগ্রা/লিটার স্নান বা ১০-২০ মিগ্রা/কেজি খাদ্য ×৩-৫ দিন; লবণ ১-২ কেজি/ডেসিমেল; KMnO4 ২ গ্রাম/ডেসিমেল)'
    },
    {
      id: 'ich',
      name: 'Ich (White Spot Disease) (ইচ (সাদা দাগ রোগ))',
      symptoms: [
        'White spots like salt grains on skin/fins (চামড়া/পাখনায় লবণের দানার মতো সাদা দাগ)'
      ],
      treatment: 'Formalin + Malachite Green, Salt, KMnO4 (ফরমালিন + ম্যালাকাইট গ্রিন, লবণ, KMnO4)',
      dosage: 'Formalin 25 ppm for 1 hour with strong aeration ×3 (48 hours apart); or Salt 3-5% dip for 5-10 minutes; KMnO4 2 g/decimel (শক্ত বায়ুচলাচল সহ ফরমালিন ২৫ পিপিএম ১ ঘন্টা ×৩ (৪৮ ঘন্টা ব্যবধানে); অথবা ৩-৫% লবণ ডুবানো ৫-১০ মিনিট; KMnO4 ২ গ্রাম/ডেসিমেল)'
    },
    {
      id: 'costia',
      name: 'Costia/Ichthyobodo (কোস্টিয়া/ইকথিওবোডো)',
      symptoms: [
        'Blue-gray patches (নীল-ধূসর দাগ)',
        'Heavy mucus (ভারী শ্লেষ্মা)',
        'Costia sign (কোস্টিয়া চিহ্ন)'
      ],
      treatment: 'Salt, KMnO4, Formalin (if legal) (লবণ, KMnO4, ফরমালিন (যদি বৈধ))',
      dosage: 'Salt dip 3-5% for 5-10 minutes; KMnO4 2-3 g/decimel; re-dose after 48-72 hours (৩-৫% লবণ ডুবানো ৫-১০ মিনিট; KMnO4 ২-৩ গ্রাম/ডেসিমেল; ৪৮-৭২ ঘন্টা পর পুনরায় ডোজ)'
    },
    {
      id: 'bacterial_ulcer',
      name: 'Bacterial Ulcer (Aeromonas/Pseudomonas) (ব্যাকটেরিয়াল আলসার (এরোমোনাস/সিউডোমোনাস))',
      symptoms: [
        'Ulcers with red edges (লাল প্রান্তযুক্ত আলসার)',
        'Scale loss (আঁশ পড়ে যাওয়া)'
      ],
      treatment: 'Oxytetracycline-OTC, Florfenicol, KMnO4 (অক্সিটেট্রাসাইক্লিন-OTC, ফ্লোরফেনিকল, KMnO4)',
      dosage: 'OTC 50-75 mg/kg/day ×5-7 days; or Florfenicol 10-15 mg/kg/day ×5 days; KMnO4 2 g/decimel (OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫-৭ দিন; অথবা ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫ দিন; KMnO4 ২ গ্রাম/ডেসিমেল)'
    },
    {
      id: 'saprolegnia',
      name: 'Saprolegnia (Fungus) (স্যাপ্রোলেগনিয়া (ছত্রাক))',
      symptoms: [
        'Cotton-like white tufts (তুলার মতো সাদা গুচ্ছ)'
      ],
      treatment: 'KMnO4, Salt, Povidone-Iodine (KMnO4, লবণ, পোভিডোন-আয়োডিন)',
      dosage: 'KMnO4 2-3 g/decimel; Salt 1-2 kg/decimel; brush iodine on wounds (KMnO4 ২-৩ গ্রাম/ডেসিমেল; লবণ ১-২ কেজি/ডেসিমেল; ক্ষতের উপর আয়োডিন ব্রাশ করা)'
    },
    {
      id: 'algal_crash',
      name: 'Algal crash/H2S exposure (শৈবাল ক্র্যাশ/H2S এক্সপোজার)',
      symptoms: [
        'Green slimy (সবুজ পিচ্ছিল)',
        'Black patches with low DO (নিম্ন ডিও সহ কালো দাগ)'
      ],
      treatment: 'Aeration, Water exchange, Agricultural Lime (বায়ুচলাচল, পানি বদল, কৃষি চুন)',
      dosage: 'Emergency aeration; 30-50% water change; Lime 1-2 kg/decimel; avoid stirring black sludge (জরুরি বায়ুচলাচল; ৩০-৫০% পানি বদল; চুন ১-২ কেজি/ডেসিমেল; কালো পাঁক না নাড়ানো)'
    },
    {
      id: 'argulus',
      name: 'Argulus (Fish Lice) (আর্গুলাস (মাছের উকুন))',
      symptoms: [
        'Disc-like lice on skin (চামড়ায় ডিস্কের মতো উকুন)'
      ],
      treatment: 'Trichlorfon/Dipterex, Salt dip (ট্রাইক্লোরফন/ডিপটেরেক্স, লবণ ডুবানো)',
      dosage: 'Trichlorfon 0.25-0.5 mg/L; repeat in 7-10 days; Salt dip 3-5% for 5-10 minutes (ট্রাইক্লোরফন ০.২৫-০.৫ মিগ্রা/লিটার; ৭-১০ দিন পর পুনরাবৃত্তি; ৩-৫% লবণ ডুবানো ৫-১০ মিনিট)'
    },
    {
      id: 'lernaea',
      name: 'Lernaea (Anchor Worm) (লার্নিয়া (নোঙর কৃমি))',
      symptoms: [
        'Thread-like worms attached (সংযুক্ত সুতা-সদৃশ কৃমি)',
        'Reddish spots at attachment sites (সংযুক্তির স্থানে লালচে দাগ)'
      ],
      treatment: 'Manual removal + Iodine, Trichlorfon (হাতে সরানো + আয়োডিন, ট্রাইক্লোরফন)',
      dosage: 'Pull out worms and apply iodine; Trichlorfon 0.25-0.5 mg/L; repeat in 10-14 days (কৃমি টেনে বের করে আয়োডিন প্রয়োগ; ট্রাইক্লোরফন ০.২৫-০.৫ মিগ্রা/লিটার; ১০-১৪ দিন পর পুনরাবৃত্তি)'
    },
    {
      id: 'septicemia',
      name: 'Septicemia/ Gas supersaturation (সেপ্টিসেমিয়া/ গ্যাস সুপারস্যাচুরেশন)',
      symptoms: [
        'Pop-eye (বেরিয়ে আসা চোখ)',
        'Blood around eyes (চোখের চারপাশে রক্ত)'
      ],
      treatment: 'Florfenicol, Water improvement (ফ্লোরফেনিকল, পানি উন্নতি)',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5 days; reduce supersaturation; gentle water change (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫ দিন; সুপারস্যাচুরেশন কমানো; মৃদু পানি বদল)'
    },
    {
      id: 'toxicity',
      name: 'Toxicity/Neurological stress (বিষক্রিয়া/স্নায়বিক চাপ)',
      symptoms: [
        'Spiral/spinning swimming (সর্পিল/ঘূর্ণায়মান সাঁতার)',
        'No external lesions (কোন বাহ্যিক ক্ষত নেই)'
      ],
      treatment: 'Water exchange, Activated Carbon, Stop feeding (পানি বদল, সক্রিয় কার্বন, খাদ্য বন্ধ)',
      dosage: '50-80% water change; Carbon 10-20 g/m³ on inflow screen; find and solve source (৫০-৮০% পানি বদল; প্রবাহ পর্দায় কার্বন ১০-২০ গ্রাম/মি³; উৎস খুঁজে সমাধান)'
    },
    {
      id: 'chronic_starvation',
      name: 'Chronic starvation/Anemia (দীর্ঘমেয়াদী অনাহার/রক্তাল্পতা)',
      symptoms: [
        'Pale liver (ফ্যাকাশে যকৃত)',
        'Enlarged gallbladder (বর্ধিত পিত্তথলি)',
        'Empty intestines (খালি অন্ত্র)'
      ],
      treatment: 'Quality Feed, Vitamin-Mineral Premix (গুণগত খাদ্য, ভিটামিন-খনিজ প্রিমিক্স)',
      dosage: 'Grower protein 28-32%; Vit C 500-1000 mg/kg feed (বর্ধনকারী প্রোটিন ২৮-৩২%; ভিট সি ৫০০-১০০০ মিগ্রা/কেজি খাদ্য)'
    },
    {
      id: 'fatty_liver',
      name: 'Fatty Liver (Hepatic Lipidosis) (চর্বিযুক্ত যকৃত (হেপাটিক লিপিডোসিস))',
      symptoms: [
        'Large liver (বড় যকৃত)',
        'Yellow (হলুদ)',
        'Oily (তৈলাক্ত)'
      ],
      treatment: 'Reduce ration, Probiotics, Vitamin E + Selenium (রেশন কমানো, প্রোবায়োটিক, ভিটামিন ই + সেলেনিয়াম)',
      dosage: 'Reduce feed 20-30% for 1-2 weeks; Vit E 100-200 mg/kg + Se 0.3 mg/kg; probiotics as per label (১-২ সপ্তাহের জন্য খাদ্য ২০-৩০% কমানো; ভিট ই ১০০-২০০ মিগ্রা/কেজি + সে ০.৩ মিগ্রা/কেজি; লেবেল অনুযায়ী প্রোবায়োটিক)'
    },
    {
      id: 'bacterial_septicemia',
      name: 'Bacterial Septicemia (ব্যাকটেরিয়াল সেপ্টিসেমিয়া)',
      symptoms: [
        'Petechial hemorrhages in liver/kidney (যকৃত/কিডনিতে পেটেকিয়াল রক্তক্ষরণ)',
        'Enlarged spleen (বর্ধিত প্লীহা)',
        'Ascites (জলোদর)'
      ],
      treatment: 'Oxytetracycline / Florfenicol, KMnO4 (অক্সিটেট্রাসাইক্লিন / ফ্লোরফেনিকল, KMnO4)',
      dosage: 'OTC 50-75 mg/kg/day ×5-7; or Florfenicol 10-15 mg/kg/day ×5; KMnO4 2 g/decimel (OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫-৭; অথবা ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫; KMnO4 ২ গ্রাম/ডেসিমেল)'
    },
    {
      id: 'bacterial_enteritis',
      name: 'Bacterial Enteritis (ব্যাকটেরিয়াল এন্টেরাইটিস)',
      symptoms: [
        'Red intestines (লাল অন্ত্র)',
        'Gas (গ্যাস)',
        'Foul odor (দুর্গন্ধ)',
        'Thin walls (পাতলা দেওয়াল)'
      ],
      treatment: 'Oxytetracycline, Probiotics (অক্সিটেট্রাসাইক্লিন, প্রোবায়োটিক)',
      dosage: 'OTC 50-75 mg/kg/day ×5; probiotics as per label; reduce ration 20-30% (OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫; লেবেল অনুযায়ী প্রোবায়োটিক; রেশন ২০-৩০% কমানো)'
    },
    {
      id: 'intestinal_nematodes',
      name: 'Intestinal Nematodes (অন্ত্রের নেমাটোড)',
      symptoms: [
        'Mucus in intestines (অন্ত্রে শ্লেষ্মা)',
        'White thread-like worms (সাদা সুতা-সদৃশ কৃমি)'
      ],
      treatment: 'Levamisole/Piperazine/Fenbendazole (লেভামিসোল/পাইপারাজিন/ফেনবেন্ডাজোল)',
      dosage: 'Levamisole 10 mg/kg once, repeat in 7-10 days; or Fenbendazole 10 mg/kg/day ×3 (লেভামিসোল ১০ মিগ্রা/কেজি একবার, ৭-১০ দিন পর পুনরাবৃত্তি; অথবা ফেনবেন্ডাজোল ১০ মিগ্রা/কেজি/দিন ×৩)'
    },
    {
      id: 'cestodes',
      name: 'Cestodes (Metacestodes) (সেস্টোড (মেটাসেস্টোড))',
      symptoms: [
        'Cysts in organs/muscle (অঙ্গ/পেশীতে সিস্ট)',
        'Small tapeworm heads (ছোট টেপওয়ার্মের মাথা)'
      ],
      treatment: 'Praziquantel in feed; Sanitation (খাদ্যে প্রাজিকোয়ান্টেল; স্বাস্থ্যবিধি)',
      dosage: 'Praziquantel 10-20 mg/kg feed ×1-3 days; prevent bird access; dry between cycles (প্রাজিকোয়ান্টেল ১০-২০ মিগ্রা/কেজি খাদ্য ×১-৩ দিন; পাখির প্রবেশ রোধ; চক্রের মধ্যে শুকানো)'
    },
    {
      id: 'dropsy',
      name: 'Dropsy/Ascites (ড্রপসি/জলোদর)',
      symptoms: [
        'Swollen belly (ফোলা পেট)',
        'Clear/yellow fluid in cavity (গহ্বরে পরিষ্কার/হলুদ তরল)'
      ],
      treatment: 'Florfenicol, Salt Bath, Supportive care (ফ্লোরফেনিকল, লবণ স্নান, সহায়ক যত্ন)',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5; Salt 1-2 kg/decimel; water improvement; cull moribund (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫; লবণ ১-২ কেজি/ডেসিমেল; পানি উন্নতি; মৃতপ্রায় সরানো)'
    },
    {
      id: 'tilv',
      name: 'TiLV suspected (TiLV সন্দেহ)',
      symptoms: [
        'Sudden mortality in all sizes (সব আকারে আকস্মিক মৃত্যু)',
        'Dark skin (গাঢ় চামড়া)',
        'Anemia (রক্তাল্পতা)'
      ],
      treatment: 'Biosecurity, Secondary control (জৈব নিরাপত্তা, গৌণ নিয়ন্ত্রণ)',
      dosage: 'Stop movement; disinfect gear; increase aeration; probiotics; notify authorities (আন্দোলন বন্ধ; সরঞ্জাম জীবাণুমুক্ত; বায়ুচলাচল বাড়ানো; প্রোবায়োটিক; কর্তৃপক্ষকে জানানো)'
    },
    {
      id: 'iridovirus',
      name: 'Iridovirus-like suspected (ইরিডোভাইরাস-সদৃশ সন্দেহ)',
      symptoms: [
        'Pale/necrotic gills (ফ্যাকাশে/নেক্রোটিক ফুলকা)',
        'Mortality without bacteria (ব্যাকটেরিয়া ছাড়াই মৃত্যু)'
      ],
      treatment: 'Biosecurity, Water Quality (জৈব নিরাপত্তা, পানির গুণমান)',
      dosage: 'Quarantine; partial harvest if deteriorating; disinfect at cycle end (কোয়ারেন্টাইন; অবনতি হলে আংশিক সংগ্রহ; চক্র শেষে জীবাণুমুক্ত)'
    },
    {
      id: 'swim_bladder_disorder',
      name: 'Swim Bladder Disorder (সাঁতারের থলির ব্যাধি)',
      symptoms: [
        'Swims on one side (একদিকে সাঁতার)',
        'Cannot stay submerged (জলে ডুবতে পারে না)'
      ],
      treatment: 'Vitamin C + Vitamin E; Pellet check (ভিটামিন সি + ভিটামিন ই; পেলেট পরীক্ষা)',
      dosage: 'Vit C 500-1000 mg/kg; Vit E 100-200 mg/kg; fast 12-24 hours, then light feeding (ভিট সি ৫০০-১০০০ মিগ্রা/কেজি; ভিট ই ১০০-২০০ মিগ্রা/কেজি; ১২-২৪ ঘন্টা উপবাস, তারপর হালকা খাওয়া)'
    },
    {
      id: 'mineral_deficiency',
      name: 'Mineral/Vit Deficiency (খনিজ/ভিটামিন ঘাটতি)',
      symptoms: [
        'Curved spine (বাঁকা মেরুদণ্ড)',
        'Jaw deformity (চোয়াল বিকৃতি)',
        'Poor growth (খারাপ বৃদ্ধি)'
      ],
      treatment: 'Balanced Starter Feed, Premix (সুষম স্টার্টার খাদ্য, প্রিমিক্স)',
      dosage: 'Starter 38-42% protein; vitamin-mineral premix as per label; maintain temperature (স্টার্টার ৩৮-৪২% প্রোটিন; লেবেল অনুযায়ী ভিটামিন-খনিজ প্রিমিক্স; তাপমাত্রা বজায় রাখা)'
    },
    {
      id: 'reproductive_inflammation',
      name: 'Reproductive Tract Inflammation/Parasitism (প্রজননতন্ত্রের প্রদাহ/পরজীবিতা)',
      symptoms: [
        'Inflammation/cysts in ovary/testis (ডিম্বাশয়/শুক্রাশয়ে প্রদাহ/সিস্ট)'
      ],
      treatment: 'Water exchange, Probiotics, Vet consult (পানি বদল, প্রোবায়োটিক, পশুচিকিৎসক পরামর্শ)',
      dosage: '20-30% water change; probiotics as per label (২০-৩০% পানি বদল; লেবেল অনুযায়ী প্রোবায়োটিক)'
    },
    {
      id: 'gas_bubble_disease',
      name: 'Gas Bubble Disease (গ্যাস বুদবুদ রোগ)',
      symptoms: [
        'Gas bubbles in fins/eyes (পাখনা/চোখে গ্যাস বুদবুদ)',
        'After new pump (নতুন পাম্পের পর)'
      ],
      treatment: 'Vent lines, Pressure ↓, Aeration Cascade (ভেন্ট লাইন, চাপ কমানো, বায়ুচলাচল ক্যাসকেড)',
      dosage: 'Fix plumbing; splash/cascade aeration; stop feeding for 24 hours (প্লাম্বিং ঠিক করা; স্প্ল্যাশ/ক্যাসকেড বায়ুচলাচল; ২৪ ঘন্টা খাদ্য বন্ধ)'
    },
    {
      id: 'ph_stress',
      name: 'pH Stress (pH চাপ)',
      symptoms: [
        'Mass surfacing after rain (বৃষ্টির পর ব্যাপক পৃষ্ঠে আসা)',
        'pH fluctuation (pH ওঠানামা)'
      ],
      treatment: 'Agricultural Lime, Controlled Exchange (কৃষি চুন, নিয়ন্ত্রিত বদল)',
      dosage: 'If pH<7, lime 1-2 kg/decimel; no lime at noon; 20-30% water change (যদি pH<7, চুন ১-২ কেজি/ডেসিমেল; দুপুরে চুন নয়; ২০-৩০% পানি বদল)'
    },
    {
      id: 'columnaris',
      name: 'Columnaris (কলামনারিস)',
      symptoms: [
        'Brown necrotic gills (বাদামি নেক্রোটিক ফুলকা)',
        'Saddleback lesions (স্যাডলব্যাক ক্ষত)'
      ],
      treatment: 'KMnO4, Oxytetracycline-OTC, Organic load ↓ (KMnO4, অক্সিটেট্রাসাইক্লিন-OTC, জৈব লোড কমানো)',
      dosage: 'KMnO4 2 g/decimel; OTC 50-75 mg/kg/day ×5; siphon waste (KMnO4 ২ গ্রাম/ডেসিমেল; OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫; বর্জ্য সাইফন)'
    },
    {
      id: 'nutritional_deficit',
      name: 'Nutritional Deficit/Bacterial Keratitis (পুষ্টির ঘাটতি/ব্যাকটেরিয়াল কেরাটাইটিস)',
      symptoms: [
        'Cloudy eyes (ঘোলা চোখ)',
        'Opaque cornea (অস্বচ্ছ কর্নিয়া)',
        'Lethargic (অলস)'
      ],
      treatment: 'Vitamin A/E/C Premix, Florfenicol (if infected) (ভিটামিন এ/ই/সি প্রিমিক্স, ফ্লোরফেনিকল (যদি সংক্রমিত))',
      dosage: 'Vitamin premix as per label; Florfenicol 10-15 mg/kg/day ×5 (লেবেল অনুযায়ী ভিটামিন প্রিমিক্স; ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫)'
    },
    {
      id: 'systemic_infection',
      name: 'Systemic Infection/Septicemia (সিস্টেমিক সংক্রমণ/সেপ্টিসেমিয়া)',
      symptoms: [
        'Very large spleen (খুব বড় প্লীহা)',
        'Petechial kidney (পেটেকিয়াল কিডনি)'
      ],
      treatment: 'Florfenicol, KMnO4, Water Improve (ফ্লোরফেনিকল, KMnO4, পানি উন্নতি)',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5; KMnO4 2 g/decimel (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫; KMnO4 ২ গ্রাম/ডেসিমেল)'
    },
    {
      id: 'bacterial_gill_disease',
      name: 'Bacterial Gill Disease/Flexibacter-like (ব্যাকটেরিয়াল ফুলকা রোগ/ফ্লেক্সিব্যাক্টার-সদৃশ)',
      symptoms: [
        'White plaque around mouth (মুখের চারপাশে সাদা প্লাক)',
        'Mortality in crowded tanks (ভিড়যুক্ত ট্যাঙ্কে মৃত্যু)'
      ],
      treatment: 'Reduce Biomass, KMnO4, OTC (বায়োমাস কমানো, KMnO4, OTC)',
      dosage: 'Thin stock; KMnO4 2 g/decimel; OTC 50-75 mg/kg/day ×5 (স্টক পাতলা করা; KMnO4 ২ গ্রাম/ডেসিমেল; OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫)'
    },
    {
      id: 'internal_protozoa',
      name: 'Internal Protozoa (Hexamita/Spironucleus) (অভ্যন্তরীণ প্রোটোজোয়া (হেক্সামিতা/স্পাইরোনিউক্লিয়াস))',
      symptoms: [
        'Eating but wasting (খাচ্ছে কিন্তু ক্ষয় হচ্ছে)',
        'Pale intestines (ফ্যাকাশে অন্ত্র)'
      ],
      treatment: 'Metronidazole (if legal), Probiotics (মেট্রোনিডাজোল (যদি বৈধ), প্রোবায়োটিক)',
      dosage: 'Metronidazole 25 mg/kg twice daily ×3-5; probiotics as per label (মেট্রোনিডাজোল ২৫ মিগ্রা/কেজি দিনে দুবার ×৩-৫; লেবেল অনুযায়ী প্রোবায়োটিক)'
    },
    {
      id: 'cold_stress',
      name: 'Cold Stress (ঠান্ডা চাপ)',
      symptoms: [
        'Lethargic in cold (ঠান্ডায় অলস)',
        'Bottom dwelling (নিচে বাস)',
        'Poor appetite (খারাপ ক্ষুধা)'
      ],
      treatment: 'Reduce Feeding, Midday Feeding, Aeration/Depth ↑ (খাওয়া কমানো, মধ্যাহ্ন খাওয়া, বায়ুচলাচল/গভীরতা বাড়ানো)',
      dosage: 'Feed once at 12-2 PM; avoid handling; maintain deep areas (১২-২ টায় একবার খাওয়ানো; হ্যান্ডলিং এড়ানো; গভীর এলাকা বজায় রাখা)'
    },
    {
      id: 'heat_stress',
      name: 'Heat Stress/Sunburn (তাপ চাপ/সানবার্ন)',
      symptoms: [
        'Surface at noon (দুপুরে পৃষ্ঠে)',
        'Pale patches (ফ্যাকাশে দাগ)',
        '>32-34°C (>৩২-৩৪°সে)'
      ],
      treatment: 'Shade, Aeration, Ration ↓ (ছায়া, বায়ুচলাচল, রেশন কমানো)',
      dosage: 'Reduce feed 20-30%; splash aeration; shade/pond dye as per label (খাদ্য ২০-৩০% কমানো; স্প্ল্যাশ বায়ুচলাচল; লেবেল অনুযায়ী ছায়া/পুকুর রং)'
    },
    {
      id: 'handling_stress',
      name: 'Handling Stress/Injury (হ্যান্ডলিং চাপ/আঘাত)',
      symptoms: [
        'Scale loss (আঁশ পড়ে যাওয়া)',
        'Injury (আঘাত)',
        'Delayed mortality after netting (জাল দিয়ে ধরা পর মৃত্যু বিলম্ব)'
      ],
      treatment: 'Salt in Transport Water, Minimize Air Exposure (পরিবহন পানিতে লবণ, বায়ু এক্সপোজার কমানো)',
      dosage: 'Salt 2-3 g/liter; oxygenation; gentle handling (লবণ ২-৩ গ্রাম/লিটার; অক্সিজেনেশন; মৃদু হ্যান্ডলিং)'
    },
    {
      id: 'h2s_poisoning',
      name: 'H2S Poisoning (Sludge) (H2S বিষক্রিয়া (পাঁক))',
      symptoms: [
        'Mass mortality at bottom (নিচে ব্যাপক মৃত্যু)',
        'Black gills (কালো ফুলকা)',
        'Rotten egg smell (পচা ডিমের গন্ধ)'
      ],
      treatment: 'Don\'t Stir Sludge, Aerate, Lime, Exchange (পাঁক না নাড়ানো, বায়ুচলাচল, চুন, বদল)',
      dosage: 'Immediate aeration; lime 1-2 kg/decimel (near edges); 30-50% water change (অবিলম্বে বায়ুচলাচল; চুন ১-২ কেজি/ডেসিমেল (প্রান্তের কাছে); ৩০-৫০% পানি বদল)'
    },
    {
      id: 'cyanobacteria_toxins',
      name: 'Cyanobacteria Toxins (সায়ানোব্যাকটেরিয়া টক্সিন)',
      symptoms: [
        'Green paint-like scum (সবুজ রঙের মতো ফেনা)',
        'Mortality after bloom crash (ব্লুম ক্র্যাশের পর মৃত্যু)'
      ],
      treatment: 'Exchange, Shading, Probiotics; Avoid Copper if fry present (বদল, ছায়া, প্রোবায়োটিক; ফ্রাই থাকলে তামা এড়ানো)',
      dosage: '30-50% change; dye/shade as per label; probiotics; monitor (৩০-৫০% বদল; লেবেল অনুযায়ী রং/ছায়া; প্রোবায়োটিক; পর্যবেক্ষণ)'
    },
    {
      id: 'mixed_infection',
      name: 'Mixed Infection (মিশ্র সংক্রমণ)',
      symptoms: [
        'Ulcers + large spleen + pale gills (আলসার + বড় প্লীহা + ফ্যাকাশে ফুলকা)'
      ],
      treatment: 'Parasite First → Bacteria Then; Water Improve (প্রথম পরজীবী → তারপর ব্যাকটেরিয়া; পানি উন্নতি)',
      dosage: 'Salt dip/KMnO4; then Florfenicol 10-15 mg/kg/day ×5; probiotics (লবণ ডুবানো/KMnO4; তারপর ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫; প্রোবায়োটিক)'
    },
    {
      id: 'iron_precipitation',
      name: 'Iron Precipitation Irritation (লোহার বৃষ্টিপাতের জ্বালা)',
      symptoms: [
        'Reddish-brown layer on gills from tube well inflow (টিউব ওয়েল প্রবাহ থেকে ফুলকায় লালচে-বাদামি স্তর)'
      ],
      treatment: 'Aerate Inflow, Settling Tank (প্রবাহ বায়ুচলাচল, নিষ্ক্রিয় ট্যাঙ্ক)',
      dosage: 'Cascade aeration; pre-settle before adding to pond (ক্যাসকেড বায়ুচলাচল; পুকুরে যোগ করার আগে প্রাক-নিষ্ক্রিয়)'
    },
    {
      id: 'overfeeding',
      name: 'Overfeeding/Temporary Buoyancy (অতিরিক্ত খাওয়া/অস্থায়ী ভাসমানতা)',
      symptoms: [
        'Belly-up floating after overfeeding (অতিরিক্ত খাওয়ার পর পেট উপরে ভাসা)',
        'Full intestines (পূর্ণ অন্ত্র)'
      ],
      treatment: 'Fasting, Small Frequent Feeds (উপবাস, ছোট ঘন ঘন খাওয়া)',
      dosage: 'Stop feeding 12-24 hours; then 70-80% ration, 2-3 times daily (১২-২৪ ঘন্টা খাওয়া বন্ধ; তারপর ৭০-৮০% রেশন, দিনে ২-৩ বার)'
    },
    {
      id: 'vitamin_c_deficiency',
      name: 'Vitamin C Deficiency (ভিটামিন সি ঘাটতি)',
      symptoms: [
        'Brittle fins (ভঙ্গুর পাখনা)',
        'Slow wound healing (ধীর ক্ষত নিরাময়)'
      ],
      treatment: 'Vitamin C Premix (ভিটামিন সি প্রিমিক্স)',
      dosage: '500-1000 mg Vit C/kg feed ×2-4 weeks (৫০০-১০০০ মিগ্রা ভিট সি/কেজি খাদ্য ×২-৪ সপ্তাহ)'
    },
    {
      id: 'black_spot_disease',
      name: 'Black Spot Disease (Metacercaria) (কালো দাগ রোগ (মেটাসারকেয়ারিয়া))',
      symptoms: [
        'Black pepper-like spots under skin (চামড়ার নিচে কালো গোলমরিচের মতো দাগ)'
      ],
      treatment: 'Break Bird/Snail Cycle, Lime, Drying (পাখি/শামুক চক্র ভাঙা, চুন, শুকানো)',
      dosage: 'Dry pond; lime 1-2 kg/decimel; control snails (পুকুর শুকানো; চুন ১-২ কেজি/ডেসিমেল; শামুক নিয়ন্ত্রণ)'
    },
    {
      id: 'chronic_anemia',
      name: 'Chronic Anemia (দীর্ঘমেয়াদী রক্তাল্পতা)',
      symptoms: [
        'Pale gills (ফ্যাকাশে ফুলকা)',
        'Thin blood (পাতলা রক্ত)',
        'Slow growth (ধীর বৃদ্ধি)'
      ],
      treatment: 'Check Feed, Deworm, Vit-Min (খাদ্য পরীক্ষা, কৃমিনাশক, ভিট-মিন)',
      dosage: 'Fenbendazole 10 mg/kg feed ×3; vitamin-mineral premix (ফেনবেন্ডাজোল ১০ মিগ্রা/কেজি খাদ্য ×৩; ভিটামিন-খনিজ প্রিমিক্স)'
    },
    {
      id: 'mouth_rot',
      name: 'Mouth Rot (Bacterial) (মুখ পচা (ব্যাকটেরিয়াল))',
      symptoms: [
        'Eroded mouth edges (ক্ষয়প্রাপ্ত মুখের প্রান্ত)',
        'Difficulty eating (খাওয়ার অসুবিধা)'
      ],
      treatment: 'Medicated Feed, Povidone-Iodine (ঔষধযুক্ত খাদ্য, পোভিডোন-আয়োডিন)',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5; 1-2% iodine on lesions (not in pond) (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫; ক্ষতের উপর ১-২% আয়োডিন (পুকুরে নয়))'
    },
    {
      id: 'gill_hyperplasia',
      name: 'Gill Hyperplasia (Irritant) (ফুলকা হাইপারপ্লাসিয়া (জ্বালা))',
      symptoms: [
        'Thick gills (মোটা ফুলকা)',
        'Poor gas exchange (খারাপ গ্যাস বিনিময়)',
        'No parasites (কোন পরজীবী নেই)'
      ],
      treatment: 'Water Improve, Reduce Organics, Mild KMnO4 (পানি উন্নতি, জৈব পদার্থ কমানো, মৃদু KMnO4)',
      dosage: 'Siphon sludge; KMnO4 2 g/decimel; increase turnover (পাঁক সাইফন; KMnO4 ২ গ্রাম/ডেসিমেল; টার্নওভার বাড়ানো)'
    },
    {
      id: 'streptococcus',
      name: 'Streptococcus agalactiae/iniae (স্ট্রেপ্টোকক্কাস অ্যাগাল্যাক্টিয়াই/ইনিয়াই)',
      symptoms: [
        'Lethargic in heat (গরমে অলস)',
        'Spinning (ঘূর্ণন)',
        'Pop-eye (বেরিয়ে আসা চোখ)',
        'Hemorrhages (রক্তক্ষরণ)',
        'Neurological signs (স্নায়বিক লক্ষণ)'
      ],
      treatment: 'Florfenicol / Oxytetracycline, Vaccination (Prevention) (ফ্লোরফেনিকল / অক্সিটেট্রাসাইক্লিন, টিকা (প্রতিরোধ))',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5-7; consider vaccination program for future (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫-৭; ভবিষ্যতের জন্য টিকা প্রোগ্রাম বিবেচনা)'
    },
    {
      id: 'edwardsiella',
      name: 'Edwardsiella tarda/ictaluri (এডওয়ার্ডসিয়েলা তার্ডা/ইক্টালুরি)',
      symptoms: [
        'Ulcers + liver/kidney abscesses (আলসার + যকৃত/কিডনি ফোড়া)',
        'High mortality (উচ্চ মৃত্যু)'
      ],
      treatment: 'Medicated feed per antibiogram (lab sensitivity) (অ্যান্টিবায়োগ্রাম অনুযায়ী ঔষধযুক্ত খাদ্য (ল্যাব সংবেদনশীলতা))',
      dosage: 'Florfenicol 10-15 mg/kg/day ×5-7; lab sensitivity recommended (ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫-৭; ল্যাব সংবেদনশীলতা সুপারিশ)'
    },
    {
      id: 'columnaris_2',
      name: 'Columnaris (কলামনারিস)',
      symptoms: [
        'White/eroded fin edges (সাদা/ক্ষয়প্রাপ্ত পাখনার প্রান্ত)',
        'Saddleback (স্যাডলব্যাক)',
        'More in warm water (গরম পানিতে বেশি)'
      ],
      treatment: 'KMnO4, OTC (KMnO4, OTC)',
      dosage: 'KMnO4 2 g/decimel; OTC 50-75 mg/kg/day ×5 (KMnO4 ২ গ্রাম/ডেসিমেল; OTC ৫০-৭৫ মিগ্রা/কেজি/দিন ×৫)'
    },
    {
      id: 'saprolegnia_eggs',
      name: 'Saprolegnia on Eggs (ডিমে স্যাপ্রোলেগনিয়া)',
      symptoms: [
        'Cotton-like growth on eggs in hatchery trays (হ্যাচারি ট্রেতে ডিমে তুলার মতো বৃদ্ধি)'
      ],
      treatment: 'Hydrogen Peroxide-H2O2, Acriflavine (হাইড্রোজেন পারঅক্সাইড-H2O2, অ্যাক্রিফ্লেভিন)',
      dosage: 'H2O2 500-1000 ppm for short time; follow SOP (H2O2 ৫০০-১০০০ পিপিএম অল্প সময়ের জন্য; SOP অনুসরণ)'
    },
    {
      id: 'argulus_bacteria',
      name: 'Argulus + Secondary Bacteria (আর্গুলাস + গৌণ ব্যাকটেরিয়া)',
      symptoms: [
        'Multiple lice + ulcers on same body (একই দেহে একাধিক উকুন + আলসার)'
      ],
      treatment: 'First Trichlorfon, Then Antibiotic Feed (প্রথম ট্রাইক্লোরফন, তারপর অ্যান্টিবায়োটিক খাদ্য)',
      dosage: 'Trichlorfon 0.25-0.5 mg/L; then Florfenicol 10-15 mg/kg/day ×5 (ট্রাইক্লোরফন ০.২৫-০.৫ মিগ্রা/লিটার; তারপর ফ্লোরফেনিকল ১০-১৫ মিগ্রা/কেজি/দিন ×৫)'
    },
    {
      id: 'osmotic_shock',
      name: 'Osmotic/pH Shock (অসমোটিক/pH শক)',
      symptoms: [
        'Rubbing after heavy rain/top-up (ভারী বৃষ্টি/টপ-আপের পর ঘষা)',
        'Mucus (শ্লেষ্মা)',
        'Mortality (মৃত্যু)'
      ],
      treatment: 'Salt, Agricultural Lime, Gradual Exchange (লবণ, কৃষি চুন, ধীরে ধীরে বদল)',
      dosage: 'Salt 1-2 kg/decimel; lime 1-2 kg/decimel; avoid sudden inflow (লবণ ১-২ কেজি/ডেসিমেল; চুন ১-২ কেজি/ডেসিমেল; আকস্মিক প্রবাহ এড়ানো)'
    },
    {
      id: 'organophosphate_poisoning',
      name: 'Organophosphate/Pyrethroid Poisoning (অর্গানোফসফেট/পাইরেথ্রয়েড বিষক্রিয়া)',
      symptoms: [
        'Mass mortality after agricultural run-off (কৃষি রান-অফের পর ব্যাপক মৃত্যু)',
        'Convulsions (খিঁচুনি)'
      ],
      treatment: 'Stop Inflow, Exchange, Activated Carbon Screen (প্রবাহ বন্ধ, বদল, সক্রিয় কার্বন পর্দা)',
      dosage: '50-80% water change; carbon 10-20 g/m³ at inlet; warn neighbors (৫০-৮০% পানি বদল; প্রবাহে কার্বন ১০-২০ গ্রাম/মি³; প্রতিবেশীদের সতর্ক করা)'
    },
    {
      id: 'healthy',
      name: 'Healthy Condition (সুস্থ অবস্থা)',
      symptoms: [],
      treatment: 'No treatment needed (কোন চিকিৎসার প্রয়োজন নেই)',
      dosage: 'Maintain good feeding and care (ভাল খাওয়া এবং যত্ন বজায় রাখা)'
    }
  ]
};

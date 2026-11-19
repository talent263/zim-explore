export type DepartureCity = 'Harare' | 'Bulawayo' | 'Mutare' | 'Gweru' | 'Masvingo'
export type Category = 'Resort' | 'Cultural Centre' | 'National Park' | 'Heritage Site'
export type RoadCondition = 'Sedan Friendly' | 'High Clearance' | '4x4 Recommended'

export interface Destination {
  id: string
  name: string
  slug: string
  province: string
  category: Category
  tagline: string
  description: string
  highlights: string[]
  images: string[]
  pricing: { residentUsd: number; nonResidentUsd: number; pricingUnit: 'per night' | 'per entry' | 'per person'; packageDeal?: string }
  logistics: { roadCondition: RoadCondition; coordinates: { lat: number; lng: number } }
  distancesFromCities: Record<DepartureCity, { km: number; driveHours: number; tollgates: number }>
  nearbyCulturalIds: string[]
  contact: { whatsappNumber: string; phone: string; email: string }
}

const photo = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`
const drive = (harare: [number, number, number], bulawayo: [number, number, number], mutare: [number, number, number], gweru: [number, number, number], masvingo: [number, number, number]) => ({
  Harare: { km: harare[0], driveHours: harare[1], tollgates: harare[2] }, Bulawayo: { km: bulawayo[0], driveHours: bulawayo[1], tollgates: bulawayo[2] }, Mutare: { km: mutare[0], driveHours: mutare[1], tollgates: mutare[2] }, Gweru: { km: gweru[0], driveHours: gweru[1], tollgates: gweru[2] }, Masvingo: { km: masvingo[0], driveHours: masvingo[1], tollgates: masvingo[2] },
})

export const destinations: Destination[] = [
  {
    id: 'great-zimbabwe', name: 'Great Zimbabwe Monuments & Shona Village', slug: 'great-zimbabwe', province: 'Masvingo', category: 'Heritage Site',
    tagline: 'Walk through the heart of an ancient kingdom.', description: 'Explore the monumental stone walls of one of Africa’s most significant archaeological sites, then meet local storytellers and craftspeople at the Shona village. The site is a living connection to Zimbabwe’s history and identity.',
    highlights: ['UNESCO World Heritage Site', 'Guided hill complex and Great Enclosure tours', 'Shona village, crafts and local storytelling'], images: [photo('photo-1516026672322-bc52d61a55d5'), photo('photo-1518837695005-2083093ee35b'), photo('photo-1500530855697-b586d89ba3ee')],
    pricing: { residentUsd: 10, nonResidentUsd: 25, pricingUnit: 'per entry', packageDeal: 'Guided heritage walk available at the gate' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -20.267, lng: 30.933 } },
    distancesFromCities: drive([292, 4.2, 2], [442, 6.2, 3], [276, 4.1, 2], [170, 2.5, 1], [28, 0.5, 0]), nearbyCulturalIds: ['great-zimbabwe-village'], contact: { whatsappNumber: '263772100101', phone: '+263 39 252 781', email: 'info@greatzimbabwe.org' },
  },
  {
    id: 'troutbeck', name: 'Troutbeck Resort', slug: 'troutbeck-resort', province: 'Manicaland', category: 'Resort', tagline: 'Slow mornings beside a Nyanga mountain lake.', description: 'A classic highland escape set in the cool air and rolling landscapes of Nyanga. Spend an unhurried weekend on the lake, walk mountain trails, or simply settle in by the fire after a day outside.',
    highlights: ['Lake-side walks and catch-and-release fishing', 'Nyanga National Park nearby', 'Cosy fireside dining and highland views'], images: [photo('photo-1470770841072-f978cf4d019e'), photo('photo-1464822759023-fed622ff2c3b'), photo('photo-1511497584788-876760111969')],
    pricing: { residentUsd: 145, nonResidentUsd: 215, pricingUnit: 'per night', packageDeal: 'Weekend escape from $145 per room, per night' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -18.366, lng: 32.755 } },
    distancesFromCities: drive([270, 4.1, 2], [610, 8.6, 4], [115, 1.8, 1], [315, 4.8, 2], [385, 5.7, 3]), nearbyCulturalIds: ['nyanga-heritage-trail'], contact: { whatsappNumber: '263772100102', phone: '+263 20 60721', email: 'reservations@troutbeck.co.zw' },
  },
  {
    id: 'tengenenge', name: 'Tengenenge Art Community', slug: 'tengenenge-art-community', province: 'Mashonaland Central', category: 'Cultural Centre', tagline: 'Meet the artists shaping Zimbabwean stone sculpture.', description: 'An open-air sculpture community where generations of artists carve, exhibit and live among their work. Wander the gardens, watch a sculptor at work and take time to hear the stories behind each piece.',
    highlights: ['Open-air sculpture garden', 'Meet artists in their working studios', 'Locally made stone sculpture'], images: [photo('photo-1579783902614-a3fb3927b6a5'), photo('photo-1577083552431-6e5fd01aa342'), photo('photo-1513364776144-60967b0f800f')],
    pricing: { residentUsd: 5, nonResidentUsd: 10, pricingUnit: 'per entry', packageDeal: 'Artist-led garden walk on request' }, logistics: { roadCondition: '4x4 Recommended', coordinates: { lat: -16.733, lng: 30.983 } },
    distancesFromCities: drive([150, 2.8, 1], [640, 9.3, 4], [370, 5.8, 3], [435, 6.5, 3], [430, 6.3, 3]), nearbyCulturalIds: [], contact: { whatsappNumber: '263772100103', phone: '+263 71 690 2245', email: 'visit@tengenenge.org' },
  },
  {
    id: 'matobo-hills', name: 'Matobo Hills & Nswatugi Cave', slug: 'matobo-hills-nswatugi-cave', province: 'Matabeleland South', category: 'National Park', tagline: 'Ancient rock art beneath balancing granite hills.', description: 'Explore a landscape of dramatic granite formations, sacred sites and some of the region’s finest rock art. Nswatugi Cave rewards a guided visit with paintings preserved across thousands of years.',
    highlights: ['Nswatugi Cave rock paintings', 'Granite kopjes and scenic viewpoints', 'Guided walks through Matobo National Park'], images: [photo('photo-1464822759023-fed622ff2c3b'), photo('photo-1472396961693-142e6e269027'), photo('photo-1469474968028-56623f02e42e')],
    pricing: { residentUsd: 8, nonResidentUsd: 15, pricingUnit: 'per entry', packageDeal: 'Park entry; guide fees may be additional' }, logistics: { roadCondition: 'High Clearance', coordinates: { lat: -20.55, lng: 28.5 } },
    distancesFromCities: drive([440, 6.2, 3], [45, 0.8, 0], [575, 8.5, 4], [205, 3, 1], [420, 6, 3]), nearbyCulturalIds: ['amagugu'], contact: { whatsappNumber: '263772100104', phone: '+263 292 882 831', email: 'matobo@zimparks.org.zw' },
  },
  {
    id: 'leopard-rock', name: 'Leopard Rock Hotel', slug: 'leopard-rock-hotel', province: 'Manicaland', category: 'Resort', tagline: 'A hillside hideaway in the Bvumba mountains.', description: 'Set high in the Bvumba, Leopard Rock pairs lush mountain gardens with wide views over the Eastern Highlands. Make it a base for forest walks, birding and a long, leisurely lunch.',
    highlights: ['Bvumba mountain and valley views', 'Forest walks and birding', 'Pool, gardens and relaxed dining'], images: [photo('photo-1448375240586-882707db888b'), photo('photo-1500530855697-b586d89ba3ee'), photo('photo-1518837695005-2083093ee35b')],
    pricing: { residentUsd: 180, nonResidentUsd: 260, pricingUnit: 'per night', packageDeal: 'Resident rates available for selected room plans' }, logistics: { roadCondition: 'High Clearance', coordinates: { lat: -19.105, lng: 32.77 } },
    distancesFromCities: drive([285, 4.3, 2], [650, 9.2, 4], [33, 0.7, 0], [330, 5, 2], [305, 4.6, 2]), nearbyCulturalIds: ['mutare-museum'], contact: { whatsappNumber: '263772100105', phone: '+263 20 60511', email: 'stay@leopardrock.co.zw' },
  },
  {
    id: 'domboshava', name: 'Domboshava Caves & Rock Art', slug: 'domboshava-caves-rock-art', province: 'Mashonaland East', category: 'Heritage Site', tagline: 'A short climb to stories painted in stone.', description: 'A peaceful granite outcrop just beyond Harare, Domboshava offers a rewarding walk, sweeping views and delicate San rock paintings. A local guide brings the site’s cultural context to life.',
    highlights: ['San rock art shelter', 'Sunset views from the granite dome', 'Community guides and picnic spots'], images: [photo('photo-1500530855697-b586d89ba3ee'), photo('photo-1469474968028-56623f02e42e'), photo('photo-1511497584788-876760111969')],
    pricing: { residentUsd: 3, nonResidentUsd: 8, pricingUnit: 'per entry', packageDeal: 'Community guide can be arranged on arrival' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -17.61, lng: 31.15 } },
    distancesFromCities: drive([32, 0.8, 0], [490, 7, 3], [300, 4.6, 2], [285, 4.5, 2], [300, 4.7, 2]), nearbyCulturalIds: [], contact: { whatsappNumber: '263772100106', phone: '+263 77 219 5081', email: 'domboshava@heritage.org.zw' },
  },
  {
    id: 'kariba-breezes', name: 'Kariba Breezes Resort', slug: 'kariba-breezes-resort', province: 'Mashonaland West', category: 'Resort', tagline: 'Lake days, fiery sunsets and a slower pace.', description: 'Set on the shores of Lake Kariba, this lakeside stay makes it easy to trade the usual routine for sunset cruises, fishing and unhurried meals with a view of the water.',
    highlights: ['Lake Kariba sunset cruises', 'Fishing and waterside downtime', 'Family-friendly resort facilities'], images: [photo('photo-1518837695005-2083093ee35b'), photo('photo-1500375592092-40eb2168fd21'), photo('photo-1473116763249-2faaef81ccda')],
    pricing: { residentUsd: 125, nonResidentUsd: 195, pricingUnit: 'per night', packageDeal: 'Ask about resident weekend packages' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -16.52, lng: 28.8 } },
    distancesFromCities: drive([365, 5.4, 3], [610, 8.8, 4], [490, 7.2, 4], [440, 6.5, 3], [550, 8, 4]), nearbyCulturalIds: ['kariba-tonga-trail'], contact: { whatsappNumber: '263772100107', phone: '+263 61 234 567', email: 'hello@karibabreezes.co.zw' },
  },
  {
    id: 'chinhoyi-caves', name: 'Chinhoyi Caves', slug: 'chinhoyi-caves', province: 'Mashonaland West', category: 'National Park', tagline: 'Descend to the still blue waters of the Sleeping Pool.', description: 'A geological wonder of limestone caverns and striking blue water, Chinhoyi Caves is an unforgettable day trip. Easy to reach from the capital, with shaded picnic places above ground.',
    highlights: ['The legendary Sleeping Pool', 'Limestone cave and cavern network', 'Picnic areas and short walking trails'], images: [photo('photo-1518837695005-2083093ee35b'), photo('photo-1473116763249-2faaef81ccda'), photo('photo-1469474968028-56623f02e42e')],
    pricing: { residentUsd: 5, nonResidentUsd: 10, pricingUnit: 'per entry', packageDeal: 'Diving is separately managed and must be booked in advance' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -17.346, lng: 30.135 } },
    distancesFromCities: drive([120, 1.8, 1], [450, 6.7, 3], [390, 5.8, 3], [330, 5, 2], [380, 5.6, 3]), nearbyCulturalIds: [], contact: { whatsappNumber: '263772100108', phone: '+263 67 212 481', email: 'chinhoyi@zimparks.org.zw' },
  },
  {
    id: 'amagugu', name: 'Amagugu International Heritage Centre', slug: 'amagugu-heritage-centre', province: 'Matabeleland South', category: 'Cultural Centre', tagline: 'A thoughtful introduction to Ndebele heritage.', description: 'A community-rooted heritage centre dedicated to preserving and sharing Ndebele culture. Exhibitions, traditional food, craft and guided experiences offer an intimate way to learn from local knowledge holders.',
    highlights: ['Ndebele heritage and cultural exhibitions', 'Traditional food and craft experiences', 'Community-led guided visits'], images: [photo('photo-1577083552431-6e5fd01aa342'), photo('photo-1513364776144-60967b0f800f'), photo('photo-1579783902614-a3fb3927b6a5')],
    pricing: { residentUsd: 6, nonResidentUsd: 12, pricingUnit: 'per person', packageDeal: 'Cultural lunch and guided visit can be arranged' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -20.53, lng: 28.43 } },
    distancesFromCities: drive([430, 6.1, 3], [40, 0.7, 0], [565, 8.3, 4], [195, 2.8, 1], [410, 5.8, 3]), nearbyCulturalIds: ['matobo-hills'], contact: { whatsappNumber: '263772100109', phone: '+263 77 560 7120', email: 'welcome@amagugu.org' },
  },
  {
    id: 'antelope-park', name: 'Antelope Park', slug: 'antelope-park', province: 'Midlands', category: 'Resort', tagline: 'A green riverside retreat just outside Gweru.', description: 'A welcoming lodge and activity destination on the edge of Gweru. Relax by the river, take a guided walk, or make a full weekend of the park’s outdoor and wildlife experiences.',
    highlights: ['Riverside lodge and gardens', 'Guided walking and wildlife activities', 'Easy access from Gweru city'], images: [photo('photo-1472396961693-142e6e269027'), photo('photo-1511497584788-876760111969'), photo('photo-1500530855697-b586d89ba3ee')],
    pricing: { residentUsd: 110, nonResidentUsd: 175, pricingUnit: 'per night', packageDeal: 'Day activities priced separately at reception' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -19.466, lng: 29.766 } },
    distancesFromCities: drive([275, 4, 2], [165, 2.4, 1], [350, 5.3, 2], [10, 0.3, 0], [170, 2.6, 1]), nearbyCulturalIds: [], contact: { whatsappNumber: '263772100110', phone: '+263 54 226 101', email: 'stay@antelopepark.co.zw' },
  },
  {
    id: 'great-zimbabwe-village', name: 'Great Zimbabwe Shona Village', slug: 'great-zimbabwe-shona-village', province: 'Masvingo', category: 'Cultural Centre', tagline: 'Hear the stories of the stone city from local voices.', description: 'A community experience close to the Great Enclosure where Shona heritage, craft and oral history take centre stage. Pair it with a monument visit for a fuller day in Masvingo.',
    highlights: ['Community-hosted cultural visit', 'Traditional crafts and storytelling', 'Pairs naturally with Great Zimbabwe Monuments'], images: [photo('photo-1577083552431-6e5fd01aa342'), photo('photo-1513364776144-60967b0f800f'), photo('photo-1500530855697-b586d89ba3ee')],
    pricing: { residentUsd: 5, nonResidentUsd: 10, pricingUnit: 'per person', packageDeal: 'Combined monument and village visit from $15 per resident' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -20.27, lng: 30.94 } },
    distancesFromCities: drive([294, 4.3, 2], [444, 6.3, 3], [278, 4.2, 2], [172, 2.6, 1], [30, 0.6, 0]), nearbyCulturalIds: ['great-zimbabwe'], contact: { whatsappNumber: '263772100111', phone: '+263 77 865 4002', email: 'village@greatzimbabwe.org' },
  },
  {
    id: 'kariba-tonga-trail', name: 'Kariba Tonga Cultural Trail', slug: 'kariba-tonga-cultural-trail', province: 'Mashonaland West', category: 'Cultural Centre', tagline: 'Discover the stories and traditions of the Tonga people.', description: 'A locally guided cultural experience in Kariba sharing Tonga history, music, craft and the relationship between communities and the lake. A meaningful complement to a lakeside stay.',
    highlights: ['Community-led storytelling and music', 'Local craft and food traditions', 'Easy to pair with a Kariba lake weekend'], images: [photo('photo-1513364776144-60967b0f800f'), photo('photo-1579783902614-a3fb3927b6a5'), photo('photo-1518837695005-2083093ee35b')],
    pricing: { residentUsd: 8, nonResidentUsd: 15, pricingUnit: 'per person', packageDeal: 'Small group visits by prior arrangement' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -16.52, lng: 28.82 } },
    distancesFromCities: drive([367, 5.5, 3], [612, 8.9, 4], [492, 7.3, 4], [442, 6.6, 3], [552, 8.1, 4]), nearbyCulturalIds: ['kariba-breezes'], contact: { whatsappNumber: '263772100112', phone: '+263 77 250 9160', email: 'karibaculture@community.org.zw' },
  },
  {
    id: 'nyanga-heritage-trail', name: 'Nyanga Heritage Trail', slug: 'nyanga-heritage-trail', province: 'Manicaland', category: 'Heritage Site', tagline: 'Stone ruins and living stories in the Eastern Highlands.', description: 'A guided heritage experience through Nyanga’s archaeological landscape, with stone terraces, ancient settlements and local perspectives on the people who shaped the highlands.',
    highlights: ['Guided visit to Nyanga stone ruins', 'Highland landscape and local knowledge', 'Pair with a Troutbeck mountain weekend'], images: [photo('photo-1464822759023-fed622ff2c3b'), photo('photo-1448375240586-882707db888b'), photo('photo-1500530855697-b586d89ba3ee')],
    pricing: { residentUsd: 4, nonResidentUsd: 8, pricingUnit: 'per entry', packageDeal: 'Community guide fee may be additional' }, logistics: { roadCondition: 'High Clearance', coordinates: { lat: -18.32, lng: 32.75 } },
    distancesFromCities: drive([266, 4, 2], [606, 8.5, 4], [111, 1.7, 1], [311, 4.7, 2], [381, 5.6, 3]), nearbyCulturalIds: ['troutbeck'], contact: { whatsappNumber: '263772100113', phone: '+263 77 911 2860', email: 'nyangaheritage@community.org.zw' },
  },
  {
    id: 'mutare-museum', name: 'Mutare Museum & Utopia House', slug: 'mutare-museum-utopia-house', province: 'Manicaland', category: 'Heritage Site', tagline: 'Local history and Eastern Highlands stories in Mutare.', description: 'A compact museum visit with regional collections, natural history and local heritage, set within reach of the Bvumba. A rewarding cultural stop on an Eastern Highlands trip.',
    highlights: ['Regional heritage and natural history', 'Historic Utopia House setting', 'Easy pairing with a Bvumba getaway'], images: [photo('photo-1579783902614-a3fb3927b6a5'), photo('photo-1513364776144-60967b0f800f'), photo('photo-1448375240586-882707db888b')],
    pricing: { residentUsd: 3, nonResidentUsd: 6, pricingUnit: 'per entry' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -18.97, lng: 32.67 } },
    distancesFromCities: drive([265, 4, 2], [630, 9, 4], [1, 0.1, 0], [310, 4.7, 2], [285, 4.3, 2]), nearbyCulturalIds: ['leopard-rock'], contact: { whatsappNumber: '263772100114', phone: '+263 20 206 331', email: 'mutaremuseum@heritage.org.zw' },
  },
  {
    id: 'victoria-falls-rainforest', name: 'Victoria Falls Rainforest', slug: 'victoria-falls-rainforest', province: 'Matabeleland North', category: 'National Park', tagline: 'Feel the spray where the Zambezi meets the gorge.', description: 'Follow the rainforest paths to a series of viewpoints over one of the world’s most remarkable waterfalls. Visit in the high-water season for thunder and spray, or later in the year for a closer look at the gorge.',
    highlights: ['Rainforest walking trails and viewpoints', 'Victoria Falls Bridge and gorge views', 'A landmark Zimbabwe experience'], images: [photo('photo-1500375592092-40eb2168fd21'), photo('photo-1473116763249-2faaef81ccda'), photo('photo-1469474968028-56623f02e42e')],
    pricing: { residentUsd: 7, nonResidentUsd: 50, pricingUnit: 'per entry', packageDeal: 'Park entry only; activities and guided tours are priced separately' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -17.9243, lng: 25.8572 } },
    distancesFromCities: drive([875, 12.5, 6], [440, 6.4, 3], [1060, 15.2, 7], [645, 9.3, 4], [730, 10.5, 5]), nearbyCulturalIds: ['victoria-falls-cultural-village'], contact: { whatsappNumber: '263772100115', phone: '+263 83 284 3271', email: 'victoriafalls@zimparks.org.zw' },
  },
  {
    id: 'victoria-falls-cultural-village', name: 'Victoria Falls Cultural Village', slug: 'victoria-falls-cultural-village', province: 'Matabeleland North', category: 'Cultural Centre', tagline: 'Local voices, craft and culture beside the Zambezi.', description: 'A locally hosted introduction to the people and traditions of the Victoria Falls region. Meet makers, learn about local customs and add a community perspective to a waterfall visit.',
    highlights: ['Community-led cultural introductions', 'Local craft and storytelling', 'Convenient pairing with the rainforest visit'], images: [photo('photo-1577083552431-6e5fd01aa342'), photo('photo-1513364776144-60967b0f800f'), photo('photo-1579783902614-a3fb3927b6a5')],
    pricing: { residentUsd: 6, nonResidentUsd: 12, pricingUnit: 'per person', packageDeal: 'Small group experiences arranged in advance' }, logistics: { roadCondition: 'Sedan Friendly', coordinates: { lat: -17.93, lng: 25.84 } },
    distancesFromCities: drive([875, 12.6, 6], [442, 6.5, 3], [1062, 15.3, 7], [647, 9.4, 4], [732, 10.6, 5]), nearbyCulturalIds: ['victoria-falls-rainforest'], contact: { whatsappNumber: '263772100116', phone: '+263 77 615 9032', email: 'visit@vf-culture.org.zw' },
  },
]

export const departureCities: DepartureCity[] = ['Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Masvingo']
export const categories: Category[] = ['Resort', 'Cultural Centre', 'National Park', 'Heritage Site']
export const EXCHANGE_RATE = 26.5 // Configurable example: ZiG per USD

export function getDestinationBySlug(slug: string) { return destinations.find((destination) => destination.slug === slug) }
export function getDestinationById(id: string) { return destinations.find((destination) => destination.id === id) }

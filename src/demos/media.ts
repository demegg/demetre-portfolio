/**
 * Photography for the fictional demo sites.
 * Swap any URL here and every demo that uses it will update.
 * Sources are Unsplash image IDs — replace with your own files whenever you like.
 */
export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`
}

export const images = {
  ember: {
    hero: photo("photo-1414235077428-338989a2e8c0", 2000),
    story: photo("photo-1559339352-11d035aa65de", 1400),
    featured: photo("photo-1544025162-d76694265947", 1800),
    kitchen: photo("photo-1556910103-1c02745aae4d", 1400),
    gallery: [
      photo("photo-1424847651672-bf20a4b0982b", 1200),
      photo("photo-1550966871-3ed3cdb5ed0c", 1200),
      photo("photo-1467003909585-2f8a72700288", 1200),
      photo("photo-1510812431401-41d2bd2722f3", 1200),
      photo("photo-1488477181946-6428a0291777", 1200),
      photo("photo-1551218808-94e220e084d2", 1200),
    ],
  },
  noir: {
    hero: photo("photo-1585747860715-2ba37e788b70", 2000),
    cut: photo("photo-1503951914875-452162b0f3f1", 1400),
    chair: photo("photo-1599351431202-1e0f0137899a", 1200),
    tools: photo("photo-1621605815971-fbc98d665033", 1200),
    gallery: [
      photo("photo-1503951914875-452162b0f3f1", 1000),
      photo("photo-1599351431202-1e0f0137899a", 1000),
      photo("photo-1585747860715-2ba37e788b70", 1000),
      photo("photo-1621605815971-fbc98d665033", 1000),
      photo("photo-1493256338651-d82f7acb2b38", 1000),
      photo("photo-1517832606299-7ae9b720a186", 1000),
    ],
    barbers: [
      photo("photo-1500648767791-00dcc994a43e", 800),
      photo("photo-1506794778202-cad84cf45f1d", 800),
      photo("photo-1492562080023-ab3db95bfbce", 800),
    ],
  },
  forge: {
    hero: photo("photo-1534438327276-14e5300c3a48", 2000),
    floor: photo("photo-1517836357463-d25dfeac3438", 1600),
    class: photo("photo-1571902943202-507ec2618e8f", 1400),
    gallery: [
      photo("photo-1534438327276-14e5300c3a48", 1200),
      photo("photo-1571902943202-507ec2618e8f", 1200),
      photo("photo-1517963879433-6ad2b056d712", 1200),
      photo("photo-1541534741688-6078c6bfb5c5", 1200),
    ],
    coaches: [
      photo("photo-1583454110551-21f2fa2afe61", 800),
      photo("photo-1541534741688-6078c6bfb5c5", 800),
      photo("photo-1548690312-e3b507d8c110", 800),
    ],
  },
  ridgeline: {
    hero: photo("photo-1600596542815-ffad4c1539a9", 2000),
    projects: [
      photo("photo-1600585154340-be6161a56a0c", 1600),
      photo("photo-1600210492486-724fe5c67fb0", 1600),
      photo("photo-1600607687939-ce8a6c25118c", 1600),
      photo("photo-1504307651254-35680f356dfd", 1600),
    ],
  },
  smilecraft: {
    hero: photo("photo-1629909613654-28e377c37b09", 1800),
    clinic: photo("photo-1606811841689-23dfddce3e95", 1400),
    room: photo("photo-1519494026892-80bbd2d6fd0d", 1400),
    doctors: [
      photo("photo-1559839734-2b71ea197ec2", 800),
      photo("photo-1612349317150-e413f6a5b16d", 800),
      photo("photo-1594824476967-48c8b964273f", 800),
    ],
  },
  lumen: {
    hero: photo("photo-1495474472287-4d71bcdd2085", 2000),
    interior: photo("photo-1554118811-1e0d58224f24", 1600),
    pour: photo("photo-1509042239860-f550ce710b93", 1400),
    pastry: photo("photo-1555507036-ab1f4038808a", 1400),
    bread: photo("photo-1509440159596-0249088772ff", 1400),
    breakfast: photo("photo-1495214783159-3503fd1b572d", 1400),
    gallery: [
      photo("photo-1554118811-1e0d58224f24", 1200),
      photo("photo-1495474472287-4d71bcdd2085", 1200),
      photo("photo-1509042239860-f550ce710b93", 1200),
      photo("photo-1555507036-ab1f4038808a", 1200),
      photo("photo-1511920170033-f8396924c348", 1200),
      photo("photo-1442512595331-e89e73853f31", 1200),
    ],
  },
  north: {
    hero: photo("photo-1600596542815-ffad4c1539a9", 2000),
    homes: [
      photo("photo-1600585154340-be6161a56a0c", 1600),
      photo("photo-1600607687939-ce8a6c25118c", 1600),
      photo("photo-1600566753190-17f0baa2a6c3", 1600),
      photo("photo-1600210492493-0946911123ea", 1600),
      photo("photo-1600573472592-401b489a3cdc", 1600),
      photo("photo-1600210492493-0946911123ea", 1600),
    ],
    agents: [
      photo("photo-1573496359142-b8d87734a5a2", 800),
      photo("photo-1560250097-0b93528c311a", 800),
      photo("photo-1472099645785-5658abf4ff4e", 800),
    ],
  },
  apex: {
    hero: photo("photo-1492144534655-ae79c964c9d7", 2000),
    finish: photo("photo-1503376780353-7e6692767b70", 1800),
    black: photo("photo-1618843479313-40f8afb4b4d8", 1600),
    detail: photo("photo-1601362840469-51e4d8d58785", 1400),
    wheel: photo("photo-1493238792000-8113da705763", 1400),
    gallery: [
      photo("photo-1492144534655-ae79c964c9d7", 1200),
      photo("photo-1503376780353-7e6692767b70", 1200),
      photo("photo-1618843479313-40f8afb4b4d8", 1200),
      photo("photo-1601362840469-51e4d8d58785", 1200),
    ],
  },
  mara: {
    hero: photo("photo-1531746020798-e6953c6e8e04", 2000),
    portraits: [
      photo("photo-1531746020798-e6953c6e8e04", 1200),
      photo("photo-1534528741775-53994a69daeb", 1200),
      photo("photo-1524504388940-b1c1722653e1", 1200),
    ],
    weddings: [
      photo("photo-1519741497674-611481863552", 1400),
      photo("photo-1511285560929-80b456fea0bc", 1400),
      photo("photo-1465495976277-4387d4b0b4c6", 1400),
    ],
    editorial: [
      photo("photo-1469334031218-e382a71b716b", 1400),
      photo("photo-1483985988355-763728e1935b", 1400),
      photo("photo-1490481651871-ab68de25d43d", 1400),
    ],
    commercial: [
      photo("photo-1441986300917-64674bd600d8", 1400),
      photo("photo-1441984904996-e0b6ba687e04", 1400),
      photo("photo-1523381294911-8d3cead13475", 1400),
    ],
    about: photo("photo-1554048612-b6a482bc67e5", 1400),
  },
  nova: {
    hero: photo("photo-1518611012118-696072aa579a", 2000),
    coach: photo("photo-1594381898411-846e7d193883", 1400),
    session: photo("photo-1571019614242-c5c5dee9f50b", 1600),
    floor: photo("photo-1581009146145-b5ef050c2e1e", 1400),
  },
} as const

import axios from "axios";


class SnapCountService {
  async getSnapCounts(team) {
    const url = "https://api.lineups.com/nfl/fetch/snaps/team/current/philadelphia-eagles";
    const res = await axios(url);
    return res.data.data;
  }
}


const snapCountService = new SnapCountService();

export default snapCountService;

// https://api.lineups.com/nfl/fetch/snaps/team/current/philadelphia-eagles
export interface WeddingData {
  couple: {
    bride: {
      name: string;
      fullName: string;
      parents: string;
      photo: string;
      instagram: string;
    };
    groom: {
      name: string;
      fullName: string;
      parents: string;
      photo: string;
      instagram: string;
    };
  };
  event: {
    date: string;
    time: string;
    venue: string;
    address: string;
    mapUrl: string;
  };
  story: {
    title: string;
    content: string;
  };
  gallery: {
    photos: string[];
    videos: string[];
  };
  livestream: {
    url: string;
    platform: string;
    scheduledTime: string;
  };
  gift: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    qrisUrl: string;
  };
  hashtag: string;
  music: {
    url: string;
    title: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    bride: {
      name: "Sarah",
      fullName: "Sarah Amanda Johnson",
      parents: "Putri dari Bapak Michael & Ibu Patricia Johnson",
      photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=500",
      instagram: "@sarahjohnson"
    },
    groom: {
      name: "David",
      fullName: "David Christopher Miller",
      parents: "Putra dari Bapak Robert & Ibu Linda Miller",
      photo: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=500",
      instagram: "@davidmiller"
    }
  },
  event: {
    date: "2024-06-15",
    time: "16:00",
    venue: "Grand Ballroom Hotel Mulia",
    address: "Jl. Asia Afrika No. 8, Gelora, Tanah Abang, Jakarta Pusat 10270",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194637395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sHotel%20Mulia%20Senayan%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1635724073477!5m2!1sen!2sid"
  },
  story: {
    title: "Our Love Story",
    content: "We first met at a coffee shop in downtown during a rainy afternoon in 2019. What started as a chance encounter over spilled coffee turned into endless conversations, shared dreams, and a love that grows stronger every day. After 5 beautiful years together, we're ready to begin our forever."
  },
  gallery: {
    photos: [
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024866/pexels-photo-1024866.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    videos: []
  },
  livestream: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YouTube Live",
    scheduledTime: "2024-06-15T16:00:00"
  },
  gift: {
    bankName: "Bank Central Asia",
    accountNumber: "1234567890",
    accountName: "Sarah & David Wedding",
    qrisUrl: "https://images.pexels.com/photos/8154297/pexels-photo-8154297.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  hashtag: "#SarahDavidForever",
  music: {
    url: "/wedding-music.mp3", // You would upload this file to public folder
    title: "Perfect - Ed Sheeran"
  }
};
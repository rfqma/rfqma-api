import { Factory } from "hono/factory";

const factory = new Factory();

export const getBMKG = factory.createHandlers(async (c) => {
  const res = {
    status: 200,
    ok: true,
    message: "success",
    data: {
      routes: [
        {
          label: "Newest Earthquake",
          desc: "route to get the BMKG newest earthquake data",
          path: `${process.env.BASE_URL}/playground/bmkg/newest-eq`,
        },
        {
          label: "Latest Earthquake",
          desc: "route to get the BMKG latest 15 earthquakes data with magnitude more than 5.0",
          path: `${process.env.BASE_URL}/playground/bmkg/latest-eq`,
        },
      ],
    },
  };
  return c.json(res, 200);
});

export const getNewestEQ = factory.createHandlers(async (c) => {
  try {
    const results = await fetch(
      "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
      { method: "GET" }
    );
    const data = await results.json();
    const newest_eq = data.Infogempa.gempa;

    const res = {
      status: 200,
      ok: true,
      message: {
        ind: "berhasil mendapatkan data gempa terbaru",
        eng: "successfully get the newest earthquake data",
      },
      data: {
        date: newest_eq.Tanggal,
        time: newest_eq.Jam,
        date_time: newest_eq.DateTime,
        coordinates: {
          latitude: newest_eq.Lintang,
          longitude: newest_eq.Bujur,
        },
        magnitude: newest_eq.Magnitude,
        depth: newest_eq.Kedalaman,
        location: newest_eq.Wilayah,
        potential: newest_eq.Potensi,
        felt_by: newest_eq.Dirasakan,
        shake_map: `https://static.bmkg.go.id/${newest_eq.Shakemap}`,
      },
    };
    return c.json(res, 200);
  } catch (error) {
    console.error(error);
    const res = {
      status: 500,
      ok: false,
      message: (error as Error).stack,
    };
    return c.json(res, 500);
  }
});

export const getLatestEQ = factory.createHandlers(async (c) => {
  try {
    const results = await fetch(
      "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json",
      { method: "GET" }
    );
    const data = await results.json();
    const latest_eq: Array<object> = data.Infogempa.gempa;
    const latest_eq_data = latest_eq.map((eq: any) => {
      return {
        date: eq.Tanggal,
        time: eq.Jam,
        date_time: eq.DateTime,
        coordinates: {
          latitude: eq.Lintang,
          longitude: eq.Bujur,
        },
        magnitude: eq.Magnitude,
        depth: eq.Kedalaman,
        location: eq.Wilayah,
        potential: eq.Potensi,
      };
    });

    const res = {
      status: 200,
      ok: true,
      message: {
        ind: "berhasil mendapatkan data 15 gempa terkini dengan magnitudo lebih dari 5.0",
        eng: "successfully get the latest 15 earthquakes data with magnitude more than 5.0",
      },
      data: latest_eq_data,
    };
    return c.json(res, 200);
  } catch (error) {
    console.error(error);
    const res = {
      status: 500,
      ok: false,
      message: (error as Error).stack,
    };
    return c.json(res, 500);
  }
});

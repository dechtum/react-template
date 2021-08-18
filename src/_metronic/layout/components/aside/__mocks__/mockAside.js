import AsideTableMock from "./AsideTableMock";
import MockUtils from "./mock.utils";

export default function mockAside(mock) {

  mock.onPost("api/Asides").reply(({ data }) => {
    const { Aside } = JSON.parse(data);
    const {
        name= "",
        tel= "",
        address= "",
        picture= "",
        district_id= "",
        province_id= "",
        zipcode_id= "",
        active= "",
    } = Aside;
 
    const id = generateUserId();
    const newAside = {
      id,
      name,
      address,
      picture,
      district_id,
      province_id,
      zipcode_id,
      active
    };
    return [200, { Aside: newAside }];
  });

  mock.onPost("api/Asides/find").reply(config => {    
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
   
    const filterdAsides = mockUtils.baseFilter(
      AsideTableMock,
      queryParams
    );
    return [200, filterdAsides];
  });

  mock.onPost("api/Asides/deleteAsides").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = AsideTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        AsideTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/Asides/updateStatusForAsides").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    AsideTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/Asides\/\d+/).reply(config => {
    const id = config.url.match(/api\/Asides\/(\d+)/)[1];
    const Aside = AsideTableMock.find(el => el.id === +id);
    if (!Aside) {
      return [400];
    }

    return [200, Aside];
  });

  mock.onPut(/api\/Asides\/\d+/).reply(config => {
    const id = config.url.match(/api\/Asides\/(\d+)/)[1];
    const { Aside } = JSON.parse(config.data);
    const index = AsideTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    AsideTableMock[index] = { ...Aside };
    return [200];
  });

  mock.onDelete(/api\/Asides\/\d+/).reply(config => {
    const id = config.url.match(/api\/Asides\/(\d+)/)[1];
    const index = AsideTableMock.findIndex(el => el.id === +id);
    AsideTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = AsideTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

import ShopsCreshopTableMock from "./ShopsCreshopTableMock";
import MockUtils from "./../mock.utils";
import {AjaxDataShopsCreshop} from './mockShopsCreshopLib'

export default function mockShopsCreshop(mock) {
  
  mock.onPost("api/ShopsCreshops").reply(({ data }) => {
    const { ShopsCreshop } = JSON.parse(data);
    console.log(ShopsCreshop);
    const {
      id,
      name = "",
      nameth="",
      tex = "",
      tel = "",
      address = "",
      picture = "",
      pictureContent = "",
      district_id = "",
      ampher_id = "",
      province_id = "",
      zipcode_id = "",
      status = 1
    } = ShopsCreshop;

    // const id = generateUserId();
    const newShopsCreshop = {
      id: id,
      name: name,
      nameth: nameth,
      tex: tex,
      tel: tel,
      address: address,
      picture: picture,
      pictureContent: pictureContent,
      district_id: district_id,
      ampher_id: ampher_id,
      province_id: province_id,
      zipcode_id: zipcode_id,
      status: status
    };
    ShopsCreshopTableMock.push(newShopsCreshop);
    console.log(ShopsCreshopTableMock);
    return [200, { ShopsCreshop: newShopsCreshop }];
  });

  mock.onPost("api/ShopsCreshops/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdShopsCreshops = mockUtils.baseFilter(
      ShopsCreshopTableMock,
      queryParams
    );
    return [200, filterdShopsCreshops];
  });

  mock.onPost("api/ShopsCreshops/deleteShopsCreshops").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = ShopsCreshopTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        ShopsCreshopTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/ShopsCreshops/updateStatusForShopsCreshops").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    ShopsCreshopTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/ShopsCreshops\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreshops\/(\d+)/)[1];
    const ShopsCreshop = ShopsCreshopTableMock.find(el => el.id === +id);
    if (!ShopsCreshop) {
      return [400];
    }

    return [200, ShopsCreshop];
  });

  mock.onPut(/api\/ShopsCreshops\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreshops\/(\d+)/)[1];
    const { ShopsCreshop } = JSON.parse(config.data);
    
    const index = ShopsCreshopTableMock.findIndex(el => el.id === +id);
   
    if (index<0) {
      return [400];
    }
    console.log(index);
    ShopsCreshopTableMock[index] = { ...ShopsCreshop };
    return [200];
  });

  mock.onDelete(/api\/ShopsCreshops\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreshops\/(\d+)/)[1];
    const index = ShopsCreshopTableMock.findIndex(el => el.id === +id);
    ShopsCreshopTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = ShopsCreshopTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

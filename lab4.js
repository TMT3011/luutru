function mySearch(event) {
  var key = event.which || event.keyCode;
  var input = document.querySelector("#search");
  if (key == 32 && input != "") {
    doSearch();
  }
}
function frmDangNhap(frm) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(frm.email.value) == false) {
    alert("Vui lòng nhập email hợp lệ.");
    frm.email.focus();
    return false;
  }
  if (frm.psw.value.length < 8) {
    alert("Hãy nhập đúng mật khẩu");
    frm.psw.focus();
    return false;
  }
  alert("Dữ liệu đã gửi");
  return true;
}
function frmDangKy(frm) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailReg.test(frm.email.value) == false) {
    alert("Vui lòng nhập email hợp lệ.");
    frm.email.focus();
    return false;
  }
  if (frm.psw.value.length < 8) {
    alert("Mật khẩu tối thiểu 8 ký tự.");
    frm.psw.focus();
    return false;
  }
  if (frm.psw.value != frm.psw2.value) {
    alert("Mật khẩu không trùng khớp.");
    frm.psw2.focus();
    return false;
  }
  alert("Dữ liệu đã gửi.");
  return true;
}
function frmLienHe(frm) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (frm.name.value.length < 4) {
    alert("Vui lòng nhập Tên của bạn.");
    frm.name.focus();
    return false;
  }
  if (emailReg.test(frm.email.value) == false) {
    alert("Vui lòng nhập email hợp lệ.");
    frm.email.focus();
    return false;
  }
  if (frm.details.value.length < 10) {
    alert("Nội dung cần liên hệ quá ngắn, vui lòng từ 10 ký tự trở lên.");
    frm.details.focus();
    return false;
  }
  alert("Đã gửi dữ liệu Liên hệ.");
  return true;
}
var itemList = {
  sp001: {
    name: "Sữa chua vị Kiwi",
    price: 21000,
    photo: "images/sanpham/kiwi.jpg",
  },
  sp002: {
    name: "Sữa chua vị Xoài",
    price: 22000,
    photo: "images/sanpham/mango.jpg",
  },
  sp003: {
    name: "Sữa chua vị Dưa lưới",
    price: 23000,
    photo: "images/sanpham/cantaloupe.jpg",
  },
  sp004: {
    name: "Sữa chua vị Mâm Xôi",
    price: 24000,
    photo: "images/sanpham/blackberry.jpg",
  },
  sp005: {
    name: "Sữa chua vị Dâu Tây",
    price: 25000,
    photo: "images/sanpham/strawberry.jpg",
  },
  sp006: {
    name: "Sữa chua vị Việt Quất",
    price: 26000,
    photo: "images/sanpham/blueberry.jpg",
  },
  sp007: {
    name: "Sữa chua vị Bưởi",
    price: 27000,
    photo: "images/sanpham/grapes.jpg",
  },
  sp008: {
    name: "Sữa chua vị Táo Xanh",
    price: 28000,
    photo: "images/sanpham/green-apple.jpg",
  },
  sp009: {
    name: "Sữa chua vị Dứa",
    price: 29000,
    photo: "images/sanpham/pineapple.jpg",
  },
};
function addCart(code) {
  let number = parseInt(document.getElementById(code).value);
  if (number == 0) {
    return;
  }
  if (typeof localStorage[code] === "undefined") {
    window.localStorage.setItem(code, number);
    alert("Đặt hàng thành công. Tổng số lượng đã đặt là: " + number + ".");
  } else {
    current = parseInt(window.localStorage.getItem(code));
    if (current + number > 100) {
      window.localStorage.setItem(code, 100);
      alert(
        "Số lượng đặt hàng không vượt quá 100. Có thể đặt thêm" +
          (100 - current) +
          "sản phẩm."
      );
      return;
    } else {
      window.localStorage.setItem(code, number + current);
      alert("Đặt hàng thành công. Đã đặt " + (number + current) + " sản phẩm.");
    }
  }
}
function xoaThe(code) {
  if (typeof window.localStorage[code] !== "undefined") {
    window.localStorage.removeItem(code);
    document
      .getElementById("cartDetails")
      .getElementsByTagName("tbody").innerHTML = "";
    showCart();
  }
}
//hàm tính chiết khấu
function getDiscountRate() {
  var d = new Date();
  var weekday = d.getDay();
  var totalMins = d.getHours() * 60 + d.getMinutes();
  if (
    weekday >= 1 &&
    weekday <= 3 &&
    ((totalMins >= 420 && totalMins <= 600) ||
      (totalMins >= 700 && totalMins <= 1020))
  ) {
    return 0.1;
  }
  return 0;
}
function showCart() {
  var tbody = document //tham chiếu đến phần tử tbody của bảng có id là cartDetail//
    .getElementById("cartDetail")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; //xoa noi dung cũ của gio hang
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }); //khoi tạo định dạng tiền tệ việt nam
  var totalPreTax = 0; //tổng tiền ban đầu là 0
  for (let i = 0; i < window.localStorage.length; i++) {
    //duyệt qua danh sách các biến toàn cục được lưu trữ
    if (typeof itemList[localStorage.key(i)] === "undefined") continue; //kiểm tra xem sản phẩm đã đặt có tồn tại trong list hay không
    var key = window.localStorage.key(i);
    var item = itemList[key];
    var qty = localStorage.getItem(key); //lấy ra số lượng đặt hàn
    //tạo ô ảnh, canh giữa
    var photo = document.createElement("td");
    photo.innerHTML = "<img src='" + item.photo + "' width='100px'/>";
    photo.style.textAlign = "center";
    //tao ô tên
    var name = document.createElement("td");
    name.innerHTML = item.name;
    //tạo ô số lượng
    var quantity = document.createElement("td");
    quantity.innerHTML = qty;
    quantity.style.textAlign = "right";
    //ô giá cả
    var price = document.createElement("td");
    price.innerHTML = formatter.format(item.price);
    price.style.textAlign = "right";
    //ô thành tiền=
    var total = document.createElement("td");
    total.innerHTML = formatter.format(item.price * qty);
    total.style.textAlign = "right";
    totalPreTax += item.price * qty;
    //nút xóa sản phẩm
    var bin = document.createElement("a");
    bin.innerHTML = "<i class='fa fa-trash trash-icon'></i>";
    bin.setAttribute("href", "#");
    bin.setAttribute("data-code", key);
    bin.onclick = function () {
      xoaThe(this.dataset.code); //vì data-code=key nên là phải .dataset.code
    };

    var rm = document.createElement("td");
    rm.appendChild(bin);
    rm.style.textAlign = "center";

    var row = document.createElement("tr");
    row.appendChild(photo);
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);
    row.appendChild(rm);

    tbody.appendChild(row);
  }
  var discountRate = getDiscountRate(); //0.1
  var discount = totalPreTax * discountRate; //gia
  var tax = 0.1 * (totalPreTax - discount);
  document.getElementById("bill_totalpretax").innerHTML =
    formatter.format(totalPreTax);
  document.getElementById("bill_discount").innerHTML =
    discountRate + " x A = " + formatter.format(discount);
  document.getElementById("bill_tax").innerHTML = formatter.format(tax);
  document.getElementById("bill_total").innerHTML = formatter.format(
    totalPreTax - discount + tax
  );
}

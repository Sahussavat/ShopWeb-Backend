# Outline
- UserAuth.js
- BuyStore.js
- GoodStore.js

# UserAuth.js
**การใช้ฟังชั่น**
: ให้ใช้ผ่าน UserAuth.dispatch()

**การใช้ getters**
: ให้ใช้ผ่าน UserAuth.getters.(ตัวแปร)

**ฟังชั่นประกอบด้วย:**
- **login** 
```
ใช้ในการ login 

การใช้ให้ส่ง parameter ดังนี้ 

UserAuth.dispatch('login',{
  email: "email", 
  password:"password" 
})

```
- **register** 
```
ใช้ในการสมัคร user เข้าระบบ

การใช้ให้ส่ง parameter ดังนี้ 

UserAuth.dispatch('register',{
  username: "username",
  email: "email",
  password: "password"
})

```
*ฟังชั่น register และ login สามารถเรียก text error ได้โดยการเติมส่วนนี้ลงด้านหลังฟังชั่น*
```
.then((err)=>{
   // โค้ดสำหรับทำงานกับตัวแปร err (error)
})
```

- **logout** 
```
ใช้ในการ logout จากระบบ

การใช้ให้ส่ง parameter ดังนี้ 

UserAuth.dispatch('logout')

```

**Getters ประกอบด้วย:**

- **user** 
```
{
  username: "username",
  email: "email",
  jwt: "jwt"
}

```
- **isAuthen** 
```
ใช้ตรวจสอบว่าผู้ใช้เข้าสู่ระบบอยู่หรือไม่ โดยจะส่งค่าเป็น boolean

```
# BuyStore.js
**การใช้ฟังชั่น**
: (ต้อง login ก่อนจึงจะใช้งานได้) ให้ใช้ผ่าน BuyStore.dispatch()

**การใช้ getters**
: ให้ใช้ผ่าน BuyStore.getters.(ตัวแปร)

**ฟังชั่นประกอบด้วย:**
- **buy** 
```
ใช้ในการซื้อสินค้า 

การใช้ให้ส่ง parameter ดังนี้ 

BuyStore.dispatch('buy',{orders: [
{
  //aka array ของข้อมูลสินค้าที่เรียกซื้อ
  goodName:"goodName",
  cost: ราคา,
  cost_type: "coins/points",
  detail: "bruh",
  pic: "",
  amount: int amount
}
]})

จะทำงานได้เมื่อ login แล้ว
```
- **increaseCoins** 
```
ใช้ในการเพิ่ม coins

การใช้ให้ส่ง parameter ดังนี้ 

BuyStore.dispatch('increaseCoins',{amount: int amount})

จะทำงานได้เมื่อ login แล้ว
```

- **addOrder** 
```
ใช้ในการเพิ่ม/แก้ไข Order 1 ชิ้น

การใช้ให้ส่ง parameter ดังนี้

BuyStore.dispatch('addOrder',{ good:{
  //aka array ของข้อมูลสินค้าที่เรียกซื้อ
  goodName:"goodName",
  cost: ราคา,
  cost_type: "coins/points",
  detail: "bruh",
  pic: "",
  amount: int amount
}, amount: int amount //จำนวนที่จะซื้อ })
```
- **editOrder** 
```
การใช้งานเหมือนฟังชัน addOrder ทุกประการ เพียงแต่เปลี่ยนชื่อฟังชันให้มันเข้ากับบริบทเฉยๆ
```
- **deleteOrder** 
```
ใช้ในการลบ Order 1 ชิ้น

การใช้ให้ส่ง parameter ดังนี้

BuyStore.dispatch('deleteOrder', {id: "id" //ไอดีสินค้า})
```

*ฟังชั่น buy, addOrder, editOrder และ amount สามารถเรียก text error ได้โดยการเติมส่วนนี้ลงด้านหลังฟังชั่น*
```
.then((err)=>{
   // โค้ดสำหรับทำงานกับตัวแปร err (error)
})
```

**Getters ประกอบด้วย:**
- **userAccounting** 
```
ข้อมูลบัญชีของผู้ใช้ ประกอบด้วย
{
  email:"email",
  coins: int coints,
  points: int points
}
```
# GoodStore.js
**การใช้ฟังชั่น**
: (ต้อง login ในฐานะ Admin ก่อนจึงจะใช้งานได้) ให้ใช้ผ่าน GoodStore.dispatch()

**การใช้ getters**
: ให้ใช้ผ่าน GoodStore.getters.(ตัวแปร)
**ฟังชั่นประกอบด้วย:**
- **addGood** 
```
ใช้ในการเพิ่มสินค้าเข้าระบบ 
สามารถใช้ได้โดยการ

GoodStore.dispatch('addGood',{
   goodName: "goodName", 
   cost: int cost, 
   cost_type: "coins/points", 
   detail: "detail", 
   pic: "pic"
})

ใช้ได้เมื่อ login ในฐานะ admin เท่านั้น
```
- **removeGood** 
```
ใช้ในการลบสินค้าออกจากระบบ 
สามารถใช้ได้โดยการ

GoodStore.dispatch('removeGood',{
   id: "int id" //id เอาได้จากข้อมูลสินค้าที่ดึงมาจาก database
})

ใช้ได้เมื่อ login ในฐานะ admin เท่านั้น
```
- **updateGood** 
```
ใช้ในการอัพเดตสินค้าในระบบ 
สามารถใช้ได้โดยการ

GoodStore.dispatch('updateGood',{id:"id" ,{
   //id ใช้ระบุว่า สินค้าที่มี id นี้จะถูกเปลี่ยนด้วยข้อมูลดังต่อไปนี้
   //ข้อมูลใหม่
   goodName: "goodName", 
   cost: int cost, 
   cost_type: "coins/points", 
   detail: "detail", 
   pic: "pic"
}})

ใช้ได้เมื่อ login ในฐานะ admin เท่านั้น
```
**Getters ประกอบด้วย:**
- **allGood** 
```
ข้อมูลเป็น Array ของสินค้าทุกประเภทที่ดึงมาจาก database
```
- **normalGood** 
```
ข้อมูลเป็น Array ของสินค้าประเภททั่วไป(ใช้ coins ในการซื้อ)ที่ดึงมาจาก database
```
- **rewardGood** 
```
ข้อมูลเป็น Array ของสินค้าประเภทรางวัล(ใช้ points ในการซื้อ)ที่ดึงมาจาก database
```

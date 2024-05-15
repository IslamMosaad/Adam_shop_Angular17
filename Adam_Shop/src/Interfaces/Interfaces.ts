export interface IRegisterDTO {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

export interface ILoginResponse {
  message: string;
  isAdmin: boolean;
  isSuccess: boolean;
  errors: any;
  expireDate: Date;
}

export interface IProductDTO {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  stock: number;
  userID?: string;
  categoryId?: number | null;
  category_name?: string | null;
}

export interface ICategoryDTO {
  id: number;
  title: string;
}

export interface ICommentDTO {
  id: number;
  body: string;
  product_id: number;
  user_id: string;
  product_name?: string | null;
}

export interface IOrderDTO {
  id: number;
  date: Date;
  price: number;
  userId: string;
  user_name?: string | null;
  paymentId: number;
  promoCodeId?: number | null;
  promoCode_name?: number | null;
}

export interface IOrderItemDTO {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product_name?: string | null;
  product_price?: number | null;
  orderId: number;
}

export interface ICartItemDTO {
  id?: number;
  user_id?: string;
  product_id: number;
  quantity: number;
  user_name?: string | null;
  product_title?: string | null;
  product_img?: string | null;
  product_price?: number | null;
}

export interface IPaymentDTO {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  totalPrice: number;
  userId: string;
  user_name?: string | null;
}


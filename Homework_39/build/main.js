function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

class DBStorageManager{constructor(instance){this.instance=instance;}save(key,record){this.instance.setItem(key,JSON.stringify(record));}get(key){const value=this.instance.getItem(key);if(!value)return null;return JSON.parse(value)}getAllRecords(){return Object.entries(this.instance).map(_ref=>{let[key,record]=_ref;return [key,JSON.parse(record)]})}delete(key){this.instance.removeItem(key);}update(id,key,value){const oldRecord=this.instance.getItem(id);if(!oldRecord)return;const newRecord=_objectSpread2(_objectSpread2({},JSON.parse(oldRecord)),{},{[key]:value});this.save(id,newRecord);}clear(){this.instance.clear();}subscribeStorage(callback){window.addEventListener("storage",callback);}}

class Modal{constructor(){var _this$_modal2;this.closeModal=e=>{const target=e.target;if(target.getAttribute("data-bs-dismiss")){var _this$_modal;(_this$_modal=this._modal)===null||_this$_modal===void 0||_this$_modal.classList.toggle("show-modal");}};this._modal=document.querySelector(".modal");this._text=document.querySelector("[data-bs-text]");this._title=document.querySelector("[data-bs-title]");(_this$_modal2=this._modal)===null||_this$_modal2===void 0||_this$_modal2.addEventListener("click",this.closeModal);}openModal(_ref,id){let{value,status}=_ref;if(this._modal)this._modal.classList.toggle("show-modal");if(this._text)this._text.innerText=value;if(this._title)this._title.innerText=`Task#${id} Status:${status}`;}}

function uuid(){const randLetter=String.fromCharCode(65+Math.floor(Math.random()*26));return randLetter+Date.now()}

var STATUSES;(function(STATUSES){STATUSES["SUBMITED"]="Submited";STATUSES["IN_PROGRES"]="In Progres";})(STATUSES||(STATUSES={}));

class Todo{constructor(db,modal){this.form=document.querySelector(".form");this.todoListContainer=document.querySelector(".todo-list");this.db=db;this.init();this.initEvents();this.db.subscribeStorage(this.handleStorageEvent.bind(this));this.modal=modal;}init(){this.db.getAllRecords().forEach(_ref=>{let[key,data]=_ref;this.drawItem(data,key);});}initEvents(){var _this$form,_this$todoListContain;if(this.form)(_this$form=this.form)===null||_this$form===void 0||_this$form.addEventListener("submit",this.add.bind(this));(_this$todoListContain=this.todoListContainer)===null||_this$todoListContain===void 0||_this$todoListContain.addEventListener("click",this.handleTodoItemEvents.bind(this));}drawItem(data,id){if(!this.todoListContainer)return;const li=document.createElement("li");const label=document.createElement("label");const checkbox=document.createElement("input");const deleteBtn=document.createElement("button");const showModal=document.createElement("button");checkbox.classList.add("form-check-input");checkbox.setAttribute("type","checkbox");checkbox.setAttribute("id",id);checkbox.checked=data.status===STATUSES.SUBMITED;label.classList.add("todo-list__item-text");label.setAttribute("for",id);label.textContent=data.value;li.setAttribute("data-todo-id",id);li.classList.add("todo-list__item");deleteBtn.textContent="delete";deleteBtn.classList.add("btn","btn-danger","todo-list__item-btn");showModal.classList.add("btn","btn-primary","todo-list__item-modalShow");showModal.textContent="show modal";li.appendChild(checkbox);li.appendChild(label);li.appendChild(deleteBtn);li.appendChild(showModal);this.todoListContainer.appendChild(li);}onDelete(target){target.parentElement.remove();this.db.delete(target.parentElement.getAttribute("data-todo-id"));}onModalOpen(target){const id=target.parentElement.getAttribute("data-todo-id");const record=this.db.get(id);if(record)this.modal.openModal(record,id);}onCheckboxToggle(target){const id=target.parentElement.getAttribute("data-todo-id");target.parentElement.classList.toggle("submited");this.db.update(String(id),"status",target.checked?STATUSES.SUBMITED:STATUSES.IN_PROGRES);}handleTodoItemEvents(e){const target=e.target;if(!(target!==null&&target!==void 0&&target.parentElement))return;if(target.classList.contains("todo-list__item-btn")){this.onDelete(target);}if(target.classList.contains("todo-list__item-modalShow")){this.onModalOpen(target);}if(target.classList.contains("form-check-input")){this.onCheckboxToggle(target);}}add(e){var _this$form2;const target=e.target;e.preventDefault();const inputTask=new FormData(target).get("task");const uniqueId=uuid();const newRecord={status:STATUSES.IN_PROGRES,value:String(inputTask)};this.db.save(uniqueId,newRecord);this.drawItem(newRecord,uniqueId);(_this$form2=this.form)===null||_this$form2===void 0||_this$form2.reset();}handleStorageEvent(e){if(e.newValue){this.drawItem(JSON.parse(e.newValue),String(e.key));}if(e.oldValue&&this.todoListContainer){var _this$todoListContain2;const todoItems=Array.from((_this$todoListContain2=this.todoListContainer)===null||_this$todoListContain2===void 0?void 0:_this$todoListContain2.children);const node=todoItems.find(node=>node.getAttribute("data-todo-id")===e.key);node===null||node===void 0||node.remove();}}}

const modal=new Modal;const db=new DBStorageManager(localStorage);new Todo(db,modal);

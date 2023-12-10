import EventDispatcher from "../event/event-dispatcher";
import EventInterface from "../event/event.interface";
import Notification, {
  NotificationErrorProps,
} from "../notification/notification";
import Id from "../value-object/id.value-object";

export default class BaseEntity {
  private _id: Id;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _notification: Notification;
  private _eventDispatcher?: EventDispatcher;

  constructor(id?: Id, eventDispatcher?: EventDispatcher) {
    this._id = id || new Id();
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._notification = new Notification();
    this._eventDispatcher = eventDispatcher;
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(at: Date) {
    this._createdAt = at;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(at: Date) {
    this._updatedAt = at;
  }

  public addError(message: string) {
    this._notification.addError({
      context: this.constructor["name"].toLowerCase(),
      message: message,
    });
  }

  public hasErrors(): boolean {
    return this._notification.hasErrors();
  }

  public getErros(): NotificationErrorProps[] {
    return this._notification.errors;
  }

  public notifyEvent(event: EventInterface) {
    if (this._eventDispatcher) {
      this._eventDispatcher.notify(event);
    }
  }
}

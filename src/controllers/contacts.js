import createHttpError from 'http-errors';

import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = req.body;
  const { name,
    phoneNumber,
    email,
    isFavourite,
    contactType } = contact;

  if (!name || !phoneNumber || !contactType) {
    next(createHttpError(400, 'name, phoneNumber и contactType required'));
    return;
  }
const newContact = await createContact({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
});
    res.status(201).send({
      status: 201,
      message: `Successfully created a contacts!`,
      data: newContact,
    });
}


export const patchContactController = async (req, res, next) => {

  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });

}

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
   if (!result) {
     next(createHttpError(404, 'Contact not found'));
     return;
   }
  res.status(204).end();
}
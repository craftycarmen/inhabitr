'use strict';

const { Question } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const questionList = [
  {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    solution: `def twoSum(nums, target):
  hash_map = {}
  for i, num in enumerate(nums):
    diff = target - num
    if diff in hash_map:
      return [hash_map[diff], i]
    hash_map[num] = i`
  },
  {
    title: "Valid Parentheses",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    solution: `def isValid(s):
  stack = []
  mapping = {')': '(', '}': '{', ']': '['}
  for char in s:
    if char in mapping:
      top_element = stack.pop() if stack else '#'
      if mapping[char] != top_element:
        return False
    else:
      stack.append(char)
  return not stack`
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the two lists.",
    solution: `class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

def mergeTwoLists(l1, l2):
  dummy = ListNode()
  tail = dummy
  while l1 and l2:
    if l1.val < l2.val:
      tail.next = l1
      l1 = l1.next
    else:
      tail.next = l2
      l2 = l2.next
    tail = tail.next
  tail.next = l1 if l1 else l2
  return dummy.next`
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.",
    solution: `def maxProfit(prices):
  min_price = float('inf')
  max_profit = 0
  for price in prices:
    if price < min_price:
      min_price = price
    elif price - min_price > max_profit:
      max_profit = price - min_price
  return max_profit`
  },
  {
    title: "Reverse Linked List",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    solution: `class ListNode:
  def __init__(self, val=0, next=None):
    self.val = val
    self.next = next

def reverseList(head):
  prev = None
  curr = head
  while curr:
    next_temp = curr.next
    curr.next = prev
    prev = curr
    curr = next_temp
  return prev`
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await Question.bulkCreate(questionList, { validate: true })
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Questions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: questionList }, {});
  }
};

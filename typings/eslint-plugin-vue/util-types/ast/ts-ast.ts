/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/typescript-estree/src/ts-estree/ts-estree.ts
 */
import { HasParentNode } from '../node'
import * as ES from './es-ast'
import { TSESTree } from '@typescript-eslint/types'
export type TSNode =
  | TSAsExpression
  | TSNonNullExpression
  | TSTypeParameterInstantiation
  | TSPropertySignature
  | TSMethodSignatureBase
  | TSLiteralType
  | TSCallSignatureDeclaration
  | TSFunctionType
  | TypeNode

export interface TSAsExpression extends HasParentNode {
  type: 'TSAsExpression'
  expression: ES.Expression
  typeAnnotation: any
}

export interface TSNonNullExpression extends HasParentNode {
  type: 'TSNonNullExpression'
  expression: ES.Expression
}

export interface TSTypeParameterInstantiation extends HasParentNode {
  type: 'TSTypeParameterInstantiation'
  params: TypeNode[]
}

export type TSPropertySignature =
  | TSPropertySignatureComputedName
  | TSPropertySignatureNonComputedName
interface TSPropertySignatureBase extends HasParentNode {
  type: 'TSPropertySignature'
  key: TSESTree.PropertyName
  optional?: boolean
  computed: boolean
  typeAnnotation?: TSESTree.TSTypeAnnotation
  initializer?: Expression
  readonly?: boolean
  static?: boolean
  export?: boolean
  accessibility?: TSESTree.Accessibility
}
interface TSPropertySignatureComputedName extends TSPropertySignatureBase {
  key: TSESTree.PropertyNameComputed
  computed: true
}
interface TSPropertySignatureNonComputedName extends TSPropertySignatureBase {
  key: TSESTree.PropertyNameNonComputed
  computed: false
}

export type TSMethodSignature =
  | TSMethodSignatureComputedName
  | TSMethodSignatureNonComputedName
interface TSMethodSignatureBase extends HasParentNode {
  type: 'TSMethodSignature'
  key: TSESTree.PropertyName
  computed: boolean
  params: TSESTree.Parameter[]
  optional?: boolean
  returnType?: TSESTree.TSTypeAnnotation
  readonly?: boolean
  typeParameters?: TSESTree.TSTypeParameterDeclaration
  accessibility?: TSESTree.Accessibility
  export?: boolean
  static?: boolean
  kind: 'get' | 'method' | 'set'
}
interface TSMethodSignatureComputedName extends TSMethodSignatureBase {
  key: TSESTree.PropertyNameComputed
  computed: true
}
interface TSMethodSignatureNonComputedName extends TSMethodSignatureBase {
  key: TSESTree.PropertyNameNonComputed
  computed: false
}

export interface TSLiteralType extends HasParentNode {
  type: 'TSLiteralType'
  literal: ES.Literal | ES.UnaryExpression | ES.UpdateExpression
}

interface TSFunctionSignatureBase extends HasParentNode {
  params: TSESTree.Parameter[]
  returnType?: TSESTree.TSTypeAnnotation
  typeParameters?: TSESTree.TSTypeParameterDeclaration
}
export interface TSCallSignatureDeclaration extends TSFunctionSignatureBase {
  type: 'TSCallSignatureDeclaration'
}
export interface TSFunctionType extends TSFunctionSignatureBase {
  type: 'TSFunctionType'
}

type TypeNodeTypes = `${TSESTree.TypeNode['type']}`

export type TypeNode =
  | (HasParentNode & {
      type: Exclude<TypeNodeTypes, 'TSFunctionType' | 'TSLiteralType'>
    })
  | TSFunctionType
  | TSLiteralType

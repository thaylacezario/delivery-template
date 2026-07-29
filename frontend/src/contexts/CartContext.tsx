import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import type { Product, SelectedAdditional } from "../types/Product";

export interface CartItem {
    id: string;
    cartItemId: string;
    product: Product;
    quantity: number;
    selectedAdditionals: SelectedAdditional[];
    observation: string;
    unitPrice: number;
    totalPrice: number;
}

interface CartContextValue {
    items: CartItem[];
    getTotalItems: () => number;
    getTotalPrice: () => number;
    addToCart: (
        product: Product,
        quantity?: number,
        selectedAdditionals?: SelectedAdditional[],
        observation?: string,
    ) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    updateCartItem: (cartItemId: string, updatedItem: {
        product: Product;
        quantity: number;
        selectedAdditionals: SelectedAdditional[];
        observation: string;
        unitPrice: number;
        totalPrice: number;
    }) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

function areAdditionalsEqual(
    left: SelectedAdditional[],
    right: SelectedAdditional[],
) {
    if (left.length !== right.length) {
        return false;
    }

    const normalizedLeft = [...left].sort((a, b) => a.additional.id.localeCompare(b.additional.id));
    const normalizedRight = [...right].sort((a, b) => a.additional.id.localeCompare(b.additional.id));

    return normalizedLeft.every(
        (item, index) =>
            item.additional.id === normalizedRight[index].additional.id && item.quantity === normalizedRight[index].quantity,
    );
}

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = useCallback(
        (
            product: Product,
            quantity = 1,
            selectedAdditionals: SelectedAdditional[] = [],
            observation = "",
        ) => {
            setItems((currentItems) => {
                const additionalsTotal = selectedAdditionals.reduce(
                    (sum, selected) => sum + selected.additional.price * selected.quantity,
                    0,
                );
                const itemUnitPrice = product.price + additionalsTotal;
                const itemTotal = itemUnitPrice * quantity;

                                const additionalsKey = selectedAdditionals
                    .map((selected) => `${selected.additional.id}:${selected.quantity}`)
                    .sort()
                    .join("|");
                const itemId = `${product.id}|${observation}|${additionalsKey}`;

                const existingItem = currentItems.find(
                    (item) =>
                        item.id === itemId &&
                        item.product.id === product.id &&
                        item.observation === observation &&
                        areAdditionalsEqual(item.selectedAdditionals, selectedAdditionals),
                );

                if (existingItem) {
                    return currentItems.map((item) =>
                        item.id === existingItem.id
                            ? {
                                  ...item,
                                  quantity: item.quantity + quantity,
                                  unitPrice: itemUnitPrice,
                                  totalPrice: (item.quantity + quantity) * itemUnitPrice,
                              }
                            : item,
                    );
                }

                return [
                    ...currentItems,
                    {
                        id: itemId,
                        cartItemId: crypto.randomUUID(),
                        product,
                        quantity,
                        selectedAdditionals,
                        observation,
                        unitPrice: itemUnitPrice,
                        totalPrice: itemTotal,
                    },
                ];
            });
        },
        [],
    );

    const removeFromCart = useCallback((itemId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    }, []);

    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        setItems((currentItems) => {
            if (quantity <= 0) {
                return currentItems.filter((item) => item.id !== itemId);
            }

            return currentItems.map((item) => {
                if (item.id !== itemId) {
                    return item;
                }

                const additionalsTotal = item.selectedAdditionals.reduce(
                    (sum, selected) => sum + selected.additional.price * selected.quantity,
                    0,
                );
                const nextUnitPrice = item.product.price + additionalsTotal;

                return {
                    ...item,
                    quantity,
                    unitPrice: nextUnitPrice,
                    totalPrice: nextUnitPrice * quantity,
                };
            });
        });
    }, []);

    const updateCartItem = useCallback(
        (
            cartItemId: string,
            updatedItem: {
                product: Product;
                quantity: number;
                selectedAdditionals: SelectedAdditional[];
                observation: string;
                unitPrice: number;
                totalPrice: number;
            },
        ) => {
            setItems((currentItems) =>
                currentItems.map((item) =>
                    item.cartItemId === cartItemId
                        ? {
                              ...item,
                              product: updatedItem.product,
                              quantity: updatedItem.quantity,
                              selectedAdditionals: updatedItem.selectedAdditionals,
                              observation: updatedItem.observation,
                              unitPrice: updatedItem.unitPrice,
                              totalPrice: updatedItem.totalPrice,
                          }
                        : item,
                ),
            );
        },
        [],
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getTotalItems = useCallback(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    const getTotalPrice = useCallback(() => {
        return items.reduce((total, item) => total + item.totalPrice, 0);
    }, [items]);

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            getTotalItems,
            getTotalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            updateCartItem,
            clearCart,
        }),
        [items, getTotalItems, getTotalPrice, addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;

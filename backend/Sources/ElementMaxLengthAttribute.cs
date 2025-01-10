using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Applies <see cref="MaxLengthAttribute"/> to every <see langword="object"/> in a <see cref="IEnumerable"/>.
/// </summary>
/// <param name="length">The max length of each <see langword="object"/>.</param>
[AttributeUsage(AttributeTargets.Property)]
internal sealed class ElementMaxLengthAttribute(int length) : MaxLengthAttribute(length)
{
    public override bool IsValid(object? value)
    {
        if (value is null)
        {
            return true;
        }
        if (value is not IEnumerable)
        {
            ErrorMessage = $"The value is not a {nameof(IEnumerable)}.";
            return false;
        }
        int index = 0;
        foreach (object? obj in (IEnumerable)value)
        {
            if (!base.IsValid(obj))
            {
                ErrorMessage = $"The element at index {index} cannot be longer than {Length}.";
                return false;
            }
            index++;
        }
        return true;
    }
}
